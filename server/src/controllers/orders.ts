import { Request, Response } from 'express';
import { Order } from '../db/entities';
import {
  addOrder as addOrderHelper,
  deleteOrder as deleteOrderHelper,
  getOrder as getOrderHelper,
  getOrders as getOrdersHelper,
  updateOrder as updateOrderHelper,
} from '../services';
import { LOG_LEVEL, logger } from '../utils/logger';

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await getOrdersHelper();

    if (!orders) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:orders',
        message: '⚠️ Orders not found',
      });

      res.status(404).send({ status: 'error', message: 'Orders not found' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:orders',
      message: 'ℹ️ Orders found successfully',
      orders,
    });

    res.status(200).send({ status: 'success', orders });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:orders',
      message: '❌ Something went wrong!',
      error,
    });

    res.status(204).send({ status: 'error', error });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id);

  try {
    const order = await getOrderHelper(orderId);

    if (!order) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:orders',
        message: `⚠️ Order with ID ${orderId} not found`,
      });

      res.status(404).send({ status: 'error', message: 'Order not found' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:orders',
      message: 'ℹ️ Order found successfully',
      order,
    });

    res.status(200).send({ status: 'success', order });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:orders',
      message: '❌ Something went wrong!',
      error,
    });

    res.status(204).send({ status: 'error', error });
  }
};

export const addOrder = async (req: Request, res: Response) => {
  const order: Order = req.body;

  try {
    const newOrder = await addOrderHelper(order);

    if (!newOrder) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:orders',
        message: '⚠️ New order was not created',
      });

      res.status(404).send({ status: 'error', message: 'New order was not created' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:orders',
      message: 'ℹ️ New order was created',
      order: newOrder,
    });

    res.status(200).send({ status: 'success', order: newOrder });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:orders',
      message: '❌ Something went wrong!',
      error,
    });

    res.status(204).send({ status: 'error', error });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id);
  const order: Order = req.body;

  try {
    const updatedOrder = await updateOrderHelper(orderId, order);

    if (!updatedOrder) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:orders',
        message: '⚠️ Order was not updated',
      });

      res.status(404).send({ status: 'error', message: 'Order was not updated' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:orders',
      message: 'ℹ️ Order was updated',
      order: updatedOrder,
    });

    res.status(200).send({ status: 'success', order: updatedOrder });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:orders',
      message: '❌ Something went wrong!',
      error,
    });

    res.status(204).send({ status: 'error', error });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id);

  try {
    const result = await deleteOrderHelper(orderId);

    if (!result) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:orders',
        message: `⚠️ Order with ID ${orderId} not deleted`,
      });

      res.status(404).send({ status: 'error', message: 'Order not deleted' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:orders',
      message: 'ℹ️ Order deleted successfully',
      result,
    });

    res.status(200).send({ status: 'success', ...result });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:orders',
      message: '❌ Something went wrong!',
      error,
    });

    res.status(204).send({ status: 'error', error });
  }
};
