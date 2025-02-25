import { orders } from '../data';

export const getOrders = () => {
  return orders;
};

export const getOrderById = (orderId: number) => {
  const order = orders.find((order) => order.id === orderId);

  return order;
};
