import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  BCRYPT_SALT_ROUNDS,
  CUSTOM_DATE_TIME_FORMAT,
  USER_AVATAR_SOURCE,
} from '../utils/constants';
import { getRandomInt } from '../utils/helpers';
import { LOG_LEVEL, logger } from '../utils/logger';
import { Order, Product, User } from './entities';
import { AppDataSource } from './index';

dayjs.extend(customParseFormat);

const ONE_YEAR_IN_MS = 31536000000;

const currentTime = new Date().getTime();
const startTime = currentTime - ONE_YEAR_IN_MS;

const seedDatabase = async () => {
  await AppDataSource.initialize();

  // await AppDataSource.synchronize(true);
  // console.log("✅ All tables cleared");

  // await AppDataSource.query(`TRUNCATE "user", "order", "product" RESTART IDENTITY CASCADE`);
  // console.log("✅ All tables truncated");

  const userRepository = AppDataSource.getRepository(User);
  const orderRepository = AppDataSource.getRepository(Order);
  const productRepository = AppDataSource.getRepository(Product);

  const userCount = await userRepository.count();
  if (userCount === 0) {
    const users = [
      userRepository.create({
        email: 'user1@example.com',
        password: await bcrypt.hash('password1', BCRYPT_SALT_ROUNDS),
        name: 'John Doe',
        gender: 'male',
        avatar: `${USER_AVATAR_SOURCE}&seed=JohnDoe`,
        phone: '555-555-5555',
        registered: dayjs(
          new Date(getRandomInt(startTime, currentTime))
        ).format(CUSTOM_DATE_TIME_FORMAT),
        active: true,
      }),
      userRepository.create({
        email: 'user2@example.com',
        password: await bcrypt.hash('password2', BCRYPT_SALT_ROUNDS),
        name: 'Esmeralda Jackson',
        gender: 'female',
        avatar: `${USER_AVATAR_SOURCE}&seed=EsmeraldaJackson`,
        registered: dayjs(
          new Date(getRandomInt(startTime, currentTime))
        ).format(CUSTOM_DATE_TIME_FORMAT),
        active: true,
      }),
      userRepository.create({
        email: 'user3@example.com',
        password: await bcrypt.hash('password3', BCRYPT_SALT_ROUNDS),
        name: 'Chris Williams',
        gender: 'male',
        avatar: `${USER_AVATAR_SOURCE}&seed=ChrisWilliams`,
        address:
          '70 Washington Square South, New York, NY 10012, United States',
        registered: dayjs(
          new Date(getRandomInt(startTime, currentTime))
        ).format(CUSTOM_DATE_TIME_FORMAT),
        active: false,
      }),
    ];
    const savedUsers = await userRepository.save(users);
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'seed:users',
      message: '✅ Users created successfully',
      usersLength: savedUsers.length,
      savedUsers,
    });
  } else {
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'seed:users',
      message: '💡 Users data already exist',
    });
  }

  const productCount = await productRepository.count();
  if (productCount === 0) {
    const products = Array.from({ length: 20 }).map((_, i) =>
      productRepository.create({
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
      })
    );
    const savedProducts = await productRepository.save(products);
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'seed:products',
      message: '✅ Products created successfully',
      productsLength: savedProducts.length,
      savedProducts,
    });
  } else {
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'seed:products',
      message: '💡 Products data already exist',
    });
  }

  const orderCount = await orderRepository.count();
  if (orderCount === 0 && productCount !== 0 && userCount !== 0) {
    const savedProducts = await productRepository.find();
    const savedUsers = await userRepository.find();

    const orders = Array.from({ length: 5 }).map((_, i) =>
      orderRepository.create({
        title: `Order ${i + 1}`,
        date: dayjs(new Date(getRandomInt(startTime, currentTime))).format(
          CUSTOM_DATE_TIME_FORMAT
        ),
        description: 'description',
        products: [
          savedProducts[i],
          savedProducts[(i + 1) % savedProducts.length],
        ],
        user: savedUsers[i % savedUsers.length],
      })
    );
    const savedOrders = await orderRepository.save(orders);
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'seed:orders',
      message: '✅ Orders created successfully',
      ordersLength: savedOrders.length,
      savedOrders,
    });
  } else {
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'seed:orders',
      message: '💡 Orders data already exist',
    });
  }

  console.log('✅ Database seeded successfully!');
  await AppDataSource.destroy();
};

seedDatabase().catch((error) => console.error('❌ Seeding failed:', error));
