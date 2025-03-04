import { Repository } from 'typeorm';
import { AppDataSource } from '../db';
import { Order } from '../db/entities';
import { LOG_LEVEL, logger } from '../utils/logger';

const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);

export const getOrder = async (orderId: number) => {
  try {
    return await orderRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'products'],
    });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'services:orders',
      message: '❌ Something went wrong!',
      error,
    });
    return Promise.reject(error);
  }
};

export const getOrders = async () => {
  try {
    return await orderRepository.find({ relations: ['user', 'products'] });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'services:orders',
      message: '❌ Something went wrong!',
      error,
    });
    return Promise.reject(error);
  }
};

export const addOrder = async (orderData: Partial<Order>) => {
  try {
    const order = orderRepository.create(orderData);
    return await orderRepository.save(order);
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'services:orders',
      message: '❌ Something went wrong!',
      error,
    });
    return Promise.reject(error);
  }
};

export const updateOrder = async (
  orderId: number,
  orderData: Partial<Order>
) => {
  try {
    await orderRepository.update(orderId, orderData);
    return await getOrder(orderId);
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'services:orders',
      message: '❌ Something went wrong!',
      error,
    });
    return Promise.reject(error);
  }
};

export const deleteOrder = async (orderId: number) => {
  try {
    const order = await orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new Error('Order not found');

    await orderRepository.remove(order);
    return { message: 'Order deleted successfully' };
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'services:orders',
      message: '❌ Something went wrong!',
      error,
    });
    return Promise.reject(error);
  }
};
