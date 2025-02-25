import express, { Request, Response } from 'express';
import { getProductById, getProducts } from '../controllers';
import { LOG_LEVEL, logger } from '../utils/logger';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const products = await getProducts();

    if (!products) {
      logger.log({
        level: LOG_LEVEL.ERROR,
        scope: 'route:products',
        message: `Products not found`,
      });
      res.status(404).send({ status: 'error', message: 'Products not found' });
      return;
    }
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'route:products',
      message: 'Products found successfully',
      products,
    });
    res.status(200).send({ status: 'success', products });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'route:products',
      message: `Products not found`,
      error,
    });
    res.status(204).send({ status: 'error', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const productId: number = parseInt(req.params.id);

  try {
    const product = await getProductById(productId);

    if (!product) {
      logger.log({
        level: LOG_LEVEL.ERROR,
        scope: 'route:products',
        message: `Product with ID ${productId} not found`,
      });
      res.status(404).send({ status: 'error', message: 'Product not found' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'route:products',
      message: 'Product found successfully',
      product,
    });
    res.status(200).send({ status: 'success', product });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'route:products',
      message: `Product with ID ${productId} not found`,
      error,
    });
    res.status(204).send({ status: 'error', error });
  }
});

export default router;
