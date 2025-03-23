import { Order, User } from '@/db/entities';
import { getRepository } from '@/db/repository';
import * as orderService from '@/services/orders';
import { logger } from '@/utils/logger';
import socket from '@/utils/socket';
import { WebSocketEvents } from '@/utils/types';

jest.mock('@/db/repository');
jest.mock('@/utils/logger');
jest.mock('@/utils/socket');

describe('order service', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockOrderRepository: any;

  const orderId = 1;
  const order: Order = {
    id: orderId,
    user: new User(),
    title: '',
    date: '',
    description: '',
    products: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockOrderRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    (getRepository as jest.Mock).mockReturnValue(mockOrderRepository);
    (socket.emit as jest.Mock).mockImplementation(() => {});
    (logger.log as jest.Mock).mockImplementation(() => {});
  });

  describe('getOrder', () => {
    it('should return an order with relations', async () => {
      (mockOrderRepository.findOne as jest.Mock).mockResolvedValue(order);

      const result = await orderService.getOrder(orderId);

      expect(result).toBe(order);
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
        relations: ['user', 'products'],
      });
    });

    it('should reject and log error on failure', async () => {
      const error = new Error('DB error');
      (mockOrderRepository.findOne as jest.Mock).mockRejectedValue(error);

      await expect(orderService.getOrder(orderId)).rejects.toBe(error);
      expect(logger.log).toHaveBeenCalledWith({
        level: 'error',
        scope: 'services:orders',
        message: '❌ Something went wrong!',
        error,
      });
    });
  });

  describe('getOrders', () => {
    it('should return all orders with relations', async () => {
      const orders = [{ id: 1 }, { id: 2 }];
      (mockOrderRepository.find as jest.Mock).mockResolvedValue(orders);

      const result = await orderService.getOrders();

      expect(result).toBe(orders);
      expect(mockOrderRepository.find).toHaveBeenCalledWith({
        relations: ['user', 'products'],
      });
    });

    it('should reject and log error on failure', async () => {
      const error = new Error('DB error');
      (mockOrderRepository.find as jest.Mock).mockRejectedValue(error);

      await expect(orderService.getOrders()).rejects.toBe(error);
      expect(logger.log).toHaveBeenCalledWith({
        level: 'error',
        scope: 'services:orders',
        message: '❌ Something went wrong!',
        error,
      });
    });
  });

  describe('addOrder', () => {
    it('should create and save an order', async () => {
      (mockOrderRepository.create as jest.Mock).mockReturnValue(order);
      (mockOrderRepository.save as jest.Mock).mockResolvedValue(order);

      const result = await orderService.addOrder(order);

      expect(result).toBe(order);
      expect(mockOrderRepository.create).toHaveBeenCalledWith(order);
      expect(mockOrderRepository.save).toHaveBeenCalledWith(order);
    });

    it('should reject and log error on failure', async () => {
      const error = new Error('DB error');
      (mockOrderRepository.create as jest.Mock).mockReturnValue(order);
      (mockOrderRepository.save as jest.Mock).mockRejectedValue(error);

      await expect(orderService.addOrder(order)).rejects.toBe(error);
      expect(logger.log).toHaveBeenCalledWith({
        level: 'error',
        scope: 'services:orders',
        message: '❌ Something went wrong!',
        error,
      });
    });
  });

  describe('updateOrder', () => {
    it('should update an order and emit socket event', async () => {
      (mockOrderRepository.update as jest.Mock).mockResolvedValue(undefined);
      (mockOrderRepository.findOne as jest.Mock).mockResolvedValue(order);

      const result = await orderService.updateOrder(orderId, order);

      expect(result).toBe(order);
      expect(mockOrderRepository.update).toHaveBeenCalledWith(orderId, order);
      expect(socket.emit).toHaveBeenCalledWith(
        WebSocketEvents.BACKEND_ONE_ORDER_UPDATED,
        { id: orderId }
      );
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
        relations: ['user', 'products'],
      });
    });

    it('should reject and log error on failure', async () => {
      const error = new Error('DB error');
      (mockOrderRepository.update as jest.Mock).mockRejectedValue(error);

      await expect(orderService.updateOrder(orderId, order)).rejects.toBe(
        error
      );
      expect(logger.log).toHaveBeenCalledWith({
        level: 'error',
        scope: 'services:orders',
        message: '❌ Something went wrong!',
        error,
      });
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order and return success message', async () => {
      (mockOrderRepository.findOne as jest.Mock).mockResolvedValue(order);
      (mockOrderRepository.remove as jest.Mock).mockResolvedValue(undefined);

      const result = await orderService.deleteOrder(orderId);

      expect(result).toEqual({ message: 'Order deleted successfully' });
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
      });
      expect(mockOrderRepository.remove).toHaveBeenCalledWith(order);
    });

    it('should reject with "Order not found" if order does not exist', async () => {
      (mockOrderRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(orderService.deleteOrder(orderId)).rejects.toMatchObject({
        message: 'Order not found',
      });
    });

    it('should reject and log error on failure', async () => {
      const error = new Error('DB error');
      (mockOrderRepository.findOne as jest.Mock).mockRejectedValue(error);

      await expect(orderService.deleteOrder(orderId)).rejects.toBe(error);
      expect(logger.log).toHaveBeenCalledWith({
        level: 'error',
        scope: 'services:orders',
        message: '❌ Something went wrong!',
        error,
      });
    });
  });
});
