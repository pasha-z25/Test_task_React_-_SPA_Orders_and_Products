import express, { Request, Response } from 'express';
import { login, register } from '../controllers';
import { getUsers } from '../services';
import { LOG_LEVEL, logger } from '../utils/logger';

const router = express.Router();

router.get('/users', async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();
    if (!users) {
      res.status(404).send({ status: 'error', message: 'Users not found' });
      return;
    }
    res.status(200).send({ status: 'success', users });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'route:auth',
      message: `Users not found`,
      error,
    });
    res.status(204).send({ status: 'error', error });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await login({ email, password });

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

router.post('/register', async (req: Request, res: Response) => {
  const user = req.body;

  try {
    const newUser = await register(user);

    if (!newUser) {
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
      newUser,
    });
    res.status(200).send({ status: 'success', user: newUser });
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
