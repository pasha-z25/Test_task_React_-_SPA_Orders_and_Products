import express, { Request, Response } from 'express';
import { getOrderById, getOrders } from '../controllers';
import { LOG_LEVEL, logger } from '../utils/logger';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const orders = await getOrders();

    if (!orders) {
      logger.log({
        level: LOG_LEVEL.ERROR,
        scope: 'route:orders',
        message: `Orders not found`,
      });
      res.status(404).send({ status: 'error', message: 'Orders not found' });
      return;
    }
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'route:orders',
      message: 'Orders found successfully',
      orders,
    });
    res.status(200).send({ status: 'success', orders });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'route:orders',
      message: `Orders not found`,
      error,
    });
    res.status(204).send({ status: 'error', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id);

  try {
    const order = await getOrderById(orderId);

    if (!order) {
      logger.log({
        level: LOG_LEVEL.ERROR,
        scope: 'route:orders',
        message: `Order with ID ${orderId} not found`,
      });
      res.status(404).send({ status: 'error', message: 'Order not found' });
      return;
    }
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'route:orders',
      message: 'Order found successfully',
      order,
    });
    res.status(200).send({ status: 'success', order });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'route:orders',
      message: `Order with ID ${orderId} not found`,
      error,
    });
    res.status(204).send({ status: 'error', error });
  }
});

export default router;
