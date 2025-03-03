import { Request, Response } from 'express';
import { Product } from '../db/entities';
import {
  addProduct as addProductHelper,
  deleteProduct as deleteProductHelper,
  getProduct as getProductHelper,
  getProducts as getProductsHelper,
  updateProduct as updateProductHelper,
} from '../services';
import { getRequestInfo } from '../utils/helpers';
import { LOG_LEVEL, logger } from '../utils/logger';
import { ResponseStatus } from '../utils/types';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProductsHelper();

    if (!products) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:products',
        message: '⚠️ Products not found',
        requestInfo: getRequestInfo(req),
      });

      res.status(404).send({
        status: ResponseStatus.ERROR,
        error: { message: 'Products not found' },
      });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:products',
      message: 'ℹ️ Products found successfully',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: products });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:products',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(204).send({ status: ResponseStatus.ERROR, error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const productId: number = parseInt(req.params.id);

  try {
    const product = await getProductHelper(productId);

    if (!product) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:products',
        message: `⚠️ Product with ID ${productId} not found`,
        requestInfo: getRequestInfo(req),
      });
      res.status(404).send({
        status: ResponseStatus.ERROR,
        error: { message: 'Product not found' },
      });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:products',
      message: 'ℹ️ Product found successfully',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: product });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:products',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(204).send({ status: ResponseStatus.ERROR, error });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const product: Product = req.body;

  try {
    const newProduct = await addProductHelper(product);

    if (!newProduct) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:products',
        message: '⚠️ New product was not created',
        requestInfo: getRequestInfo(req),
      });

      res.status(404).send({
        status: ResponseStatus.ERROR,
        error: { message: 'New product was not created' },
      });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:products',
      message: 'ℹ️ New product was created',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: newProduct });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:products',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(204).send({ status: ResponseStatus.ERROR, error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId: number = parseInt(req.params.id);
  const product: Product = req.body;

  try {
    const updatedProduct = await updateProductHelper(productId, product);

    if (!updatedProduct) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:products',
        message: '⚠️ Product was not updated',
        requestInfo: getRequestInfo(req),
      });

      res.status(404).send({
        status: ResponseStatus.ERROR,
        error: { message: 'Product was not updated' },
      });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:products',
      message: 'ℹ️ Product was updated',
      requestInfo: getRequestInfo(req),
    });

    res
      .status(200)
      .send({ status: ResponseStatus.SUCCESS, data: updatedProduct });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:products',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(204).send({ status: ResponseStatus.ERROR, error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId: number = parseInt(req.params.id);

  try {
    const result = await deleteProductHelper(productId);

    if (!result) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:products',
        message: `⚠️ Product with ID ${productId} not found`,
        requestInfo: getRequestInfo(req),
      });

      res.status(404).send({
        status: ResponseStatus.ERROR,
        error: { message: 'Product not found' },
      });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:products',
      message: 'ℹ️ Product found successfully',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: result });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:products',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(204).send({ status: ResponseStatus.ERROR, error });
  }
};
