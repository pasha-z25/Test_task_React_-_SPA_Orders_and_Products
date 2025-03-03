import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { In } from 'typeorm';
import {
  BCRYPT_SALT_ROUNDS,
  CUSTOM_DATE_TIME_FORMAT,
  USER_AVATAR_SOURCE,
} from '../utils/constants';
import { getRandomInt } from '../utils/helpers';
import { LOG_LEVEL, logger } from '../utils/logger';
import { Order, Product, User } from './entities';
import { AppDataSource, initializeWithRetry } from './index';

dayjs.extend(customParseFormat);

const ONE_YEAR_IN_MS = 31536000000;

const currentTime = new Date().getTime();
const startTime = currentTime - ONE_YEAR_IN_MS;

const seedDatabase = async () => {
  await initializeWithRetry();

  const userRepository = AppDataSource.getRepository(User);
  const orderRepository = AppDataSource.getRepository(Order);
  const productRepository = AppDataSource.getRepository(Product);

  const userCount = await userRepository.count();
  const productCount = await productRepository.count();
  const orderCount = await orderRepository.count();

  if (userCount > 0 && productCount > 0 && orderCount > 0) {
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'seed:tables',
      message: '💡 Database already seeded, skipping...',
    });
    await AppDataSource.destroy();
    return;
  }

  await AppDataSource.synchronize(true);
  logger.log({
    level: LOG_LEVEL.INFO,
    scope: 'seed:tables',
    message: '✅ All tables cleared',
  });

  const users = [
    userRepository.create({
      email: 'user1@example.com',
      password: await bcrypt.hash('password1', BCRYPT_SALT_ROUNDS),
      name: 'John Doe',
      gender: 'male',
      avatar: `${USER_AVATAR_SOURCE}&seed=JohnDoe`,
      phone: '555-555-5555',
      registered: dayjs(new Date(getRandomInt(startTime, currentTime))).format(
        CUSTOM_DATE_TIME_FORMAT
      ),
      active: true,
    }),
    userRepository.create({
      email: 'user2@example.com',
      password: await bcrypt.hash('password2', BCRYPT_SALT_ROUNDS),
      name: 'Esmeralda Jackson',
      gender: 'female',
      avatar: `${USER_AVATAR_SOURCE}&seed=EsmeraldaJackson`,
      registered: dayjs(new Date(getRandomInt(startTime, currentTime))).format(
        CUSTOM_DATE_TIME_FORMAT
      ),
      active: true,
    }),
    userRepository.create({
      email: 'user3@example.com',
      password: await bcrypt.hash('password3', BCRYPT_SALT_ROUNDS),
      name: 'Chris Williams',
      gender: 'male',
      avatar: `${USER_AVATAR_SOURCE}&seed=ChrisWilliams`,
      address: '70 Washington Square South, New York, NY 10012, United States',
      registered: dayjs(new Date(getRandomInt(startTime, currentTime))).format(
        CUSTOM_DATE_TIME_FORMAT
      ),
      active: false,
    }),
  ];
  const savedUsers = await userRepository.save(users);
  logger.log({
    level: LOG_LEVEL.INFO,
    scope: 'seed:users',
    message: '✅ Users created successfully',
    usersLength: savedUsers.length,
  });

  const orders = Array.from({ length: 5 }).map((_, i) =>
    orderRepository.create({
      title: `Supply ${i + 1}`,
      date: dayjs(new Date(getRandomInt(startTime, currentTime))).format(
        CUSTOM_DATE_TIME_FORMAT
      ),
      description: 'Supply description',
      user: savedUsers[getRandomInt(0, savedUsers.length - 1)],
      products: [],
    })
  );
  const savedOrders = await orderRepository.save(orders);
  logger.log({
    level: LOG_LEVEL.INFO,
    scope: 'seed:orders',
    message: '✅ Orders created successfully',
    ordersLength: savedOrders.length,
  });

  const products = Array.from({ length: 20 }).map((_, i) => {
    const randomOrder = savedOrders[getRandomInt(0, savedOrders.length - 1)];
    return productRepository.create({
      serialNumber: getRandomInt(1000, 3000),
      isNew: Boolean(getRandomInt(0, 1)),
      photo: `https://picsum.photos/1000?random=${i + 1}`,
      title: `Product ${i + 1}`,
      type: `Type ${getRandomInt(1, 5)}`,
      specification: `Specification ${getRandomInt(1, 5)}`,
      guarantee: {
        start: dayjs(new Date(getRandomInt(startTime, currentTime))).format(
          CUSTOM_DATE_TIME_FORMAT
        ),
        end: dayjs(new Date(getRandomInt(startTime, currentTime))).format(
          CUSTOM_DATE_TIME_FORMAT
        ),
      },
      price: [
        { value: getRandomInt(100, 1000), symbol: 'USD', isDefault: true },
        { value: getRandomInt(100, 1000), symbol: 'UAH', isDefault: false },
      ],
      date: dayjs(new Date(getRandomInt(startTime, currentTime))).format(
        CUSTOM_DATE_TIME_FORMAT
      ),
      order: randomOrder,
    });
  });
  const savedProducts = await productRepository.save(products);
  logger.log({
    level: LOG_LEVEL.INFO,
    scope: 'seed:products',
    message: '✅ Products created successfully',
    productsLength: savedProducts.length,
  });

  const loadedProducts = await productRepository.find({
    where: { id: In(savedProducts.map((p) => p.id)) },
    relations: ['order'],
  });

  const loadedOrders = await orderRepository.find({
    where: { id: In(savedOrders.map((o) => o.id)) },
    relations: ['user'],
  });

  const updatedOrders = new Map<number, Order>();
  const updatedUsers = new Map<number, User>();

  for (const product of loadedProducts) {
    const order = product.order;
    if (!order) {
      console.error('No order for product:', product.id);
      continue;
    }
    if (!updatedOrders.has(order.id)) {
      order.products = order.products || [];
      updatedOrders.set(order.id, order);
    }
    updatedOrders.get(order.id)!.products.push(product);
  }

  for (const order of loadedOrders) {
    const user = order.user;
    if (!user) {
      console.error('No user for order:', order.id);
      continue;
    }
    if (!updatedUsers.has(user.id)) {
      user.orders = user.orders || [];
      updatedUsers.set(user.id, user);
    }
    updatedUsers.get(user.id)!.orders.push(order);
  }

  await orderRepository.save([...updatedOrders.values()], { reload: true });
  await userRepository.save([...updatedUsers.values()], { reload: true });

  logger.log({
    level: LOG_LEVEL.INFO,
    scope: 'seed:relations',
    message: '✅ User and Order relations updated successfully',
  });

  logger.log({
    level: LOG_LEVEL.INFO,
    scope: 'seed:tables',
    message: '✅ Database seeded successfully!',
  });

  await AppDataSource.destroy();
};

seedDatabase().catch((error) => console.error('❌ Seeding failed:', error));
