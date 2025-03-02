import { Request, Response } from 'express';
import { Order } from '../db/entities';
import {
  addOrder as addOrderHelper,
  deleteOrder as deleteOrderHelper,
  getOrder as getOrderHelper,
  getOrders as getOrdersHelper,
  updateOrder as updateOrderHelper,
} from '../services';
import { getRequestInfo } from '../utils/helpers';
import { LOG_LEVEL, logger } from '../utils/logger';
import { ResponseStatus } from '../utils/types';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrdersHelper();

    if (!orders) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:orders',
        message: '⚠️ Orders not found',
        requestInfo: getRequestInfo(req),
      });

      res
        .status(404)
        .send({ status: ResponseStatus.ERROR, error: { message: 'Orders not found' } });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:orders',
      message: 'ℹ️ Orders found successfully',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: orders });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:orders',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(204).send({ status: ResponseStatus.ERROR, error });
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
        requestInfo: getRequestInfo(req),
      });

      res.status(404).send({ status: ResponseStatus.ERROR, error: { message: 'Order not found' } });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:orders',
      message: 'ℹ️ Order found successfully',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: order });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:orders',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(204).send({ status: ResponseStatus.ERROR, error });
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
        requestInfo: getRequestInfo(req),
      });

      res
        .status(404)
        .send({ status: ResponseStatus.ERROR, error: { message: 'New order was not created' } });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:orders',
      message: 'ℹ️ New order was created',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: newOrder });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:orders',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(204).send({ status: ResponseStatus.ERROR, error });
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
        requestInfo: getRequestInfo(req),
      });

      res
        .status(404)
        .send({ status: ResponseStatus.ERROR, error: { message: 'Order was not updated' } });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:orders',
      message: 'ℹ️ Order was updated',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: updatedOrder });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:orders',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(204).send({ status: ResponseStatus.ERROR, error });
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
        requestInfo: getRequestInfo(req),
      });

      res
        .status(404)
        .send({ status: ResponseStatus.ERROR, error: { message: 'Order not deleted' } });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:orders',
      message: 'ℹ️ Order deleted successfully',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: result });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:orders',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(204).send({ status: ResponseStatus.ERROR, error });
  }
};
