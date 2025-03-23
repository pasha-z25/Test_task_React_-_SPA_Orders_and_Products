import { Order } from '@/db/entities';
import { getRepository } from '@/db/repository';
import { handleError } from '@/utils/helpers';
import socket from '@/utils/socket';
import { WebSocketEvents } from '@/utils/types';

export const getOrder = async (orderId: number) => {
  try {
    const orderRepository = getRepository(Order);
    return await orderRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'products'],
    });
  } catch (error) {
    handleError('services:orders', error);
    return Promise.reject(error);
  }
};

export const getOrders = async () => {
  try {
    const orderRepository = getRepository(Order);
    return await orderRepository.find({ relations: ['user', 'products'] });
  } catch (error) {
    handleError('services:orders', error);
    return Promise.reject(error);
  }
};

export const addOrder = async (orderData: Partial<Order>) => {
  try {
    const orderRepository = getRepository(Order);
    const order = orderRepository.create(orderData);
    return await orderRepository.save(order);
  } catch (error) {
    handleError('services:orders', error);
    return Promise.reject(error);
  }
};

export const updateOrder = async (
  orderId: number,
  orderData: Partial<Order>
) => {
  try {
    const orderRepository = getRepository(Order);
    await orderRepository.update(orderId, orderData);
    socket.emit(WebSocketEvents.BACKEND_ONE_ORDER_UPDATED, { id: orderId });
    return await getOrder(orderId);
  } catch (error) {
    handleError('services:orders', error);
    return Promise.reject(error);
  }
};

export const deleteOrder = async (orderId: number) => {
  try {
    const orderRepository = getRepository(Order);
    const order = await orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new Error('Order not found');

    await orderRepository.remove(order);
    return { message: 'Order deleted successfully' };
  } catch (error) {
    handleError('services:orders', error);
    return Promise.reject(error);
  }
};
