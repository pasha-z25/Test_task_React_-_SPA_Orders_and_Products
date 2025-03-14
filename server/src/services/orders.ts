import { AppDataSource } from '@/db';
import { Order } from '@/db/entities';
import { LOG_LEVEL, logger } from '@/utils/logger';
import socket from '@/utils/socket';
import { WebSocketEvents } from '@/utils/types';
import { Repository } from 'typeorm';

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
    socket.emit(WebSocketEvents.BACKEND_ALL_ORDERS_READ);
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
    socket.emit(WebSocketEvents.BACKEND_ONE_ORDER_UPDATED, { id: orderId });
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
