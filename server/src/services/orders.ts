import { Repository } from 'typeorm';
import { AppDataSource } from '../db';
import { Order } from '../db/entities';

const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);

export const getOrder = async (orderId: number) => {
  return await orderRepository.findOne({
    where: { id: orderId },
    relations: ['user', 'products'],
  });
};

export const getOrders = async () => {
  return await orderRepository.find({ relations: ['user', 'products'] });
};

export const addOrder = async (orderData: Partial<Order>) => {
  const order = orderRepository.create(orderData);
  return await orderRepository.save(order);
};

export const updateOrder = async (
  orderId: number,
  orderData: Partial<Order>
) => {
  await orderRepository.update(orderId, orderData);
  return await getOrder(orderId);
};

export const deleteOrder = async (orderId: number) => {
  const order = await orderRepository.findOne({ where: { id: orderId } });
  if (!order) throw new Error('Order not found');

  await orderRepository.remove(order);
  return { message: 'Order deleted successfully' };
};
