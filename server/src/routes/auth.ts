import express, { Request, Response } from 'express';
import { login, register } from '../controllers';
import { LOG_LEVEL, logger } from '../utils/logger';

const router = express.Router();

router.post('/login', async (_req: Request, res: Response) => {
  try {
    const user = await login();

    if (!user) {
      logger.log({
        level: LOG_LEVEL.ERROR,
        scope: 'route:auth',
        message: `User not found`,
      });
      res.status(404).send({ status: 'error', message: 'User not found' });
      return;
    }
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'route:orders',
      message: 'User found successfully',
      user,
    });
    res.status(200).send({ status: 'success', user });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'route:auth',
      message: `User not found`,
      error,
    });
    res.status(204).send({ status: 'error', error });
  }
});

router.post('/register', async (_req: Request, res: Response) => {
  try {
    const user = await register();

    if (!user) {
      logger.log({
        level: LOG_LEVEL.ERROR,
        scope: 'route:auth',
        message: `Something went wrong!`,
      });
      res.status(404).send({ status: 'error', message: 'Something went wrong!' });
      return;
    }
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'route:orders',
      message: 'User created successfully',
      user,
    });
    res.status(200).send({ status: 'success', user });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'route:auth',
      message: `Something went wrong!`,
      error,
    });
    res.status(204).send({ status: 'error', error });
  }
});

export default router;
