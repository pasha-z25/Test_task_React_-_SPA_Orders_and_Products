import { Request, Response } from 'express';
import { User } from '../db/entities';
import { addUser, login as loginHelper } from '../services';
import { LOG_LEVEL, logger } from '../utils/logger';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    logger.log({
      level: LOG_LEVEL.WARN,
      scope: 'controller:auth',
      message: '⚠️ Email or password is empty',
    });

    res.status(400).send({ status: 'error', message: 'Email or password is empty' });
    return;
  }

  try {
    const user = await loginHelper(email, password);

    if (!user) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:auth',
        message: '⚠️ User not found',
      });

      res.status(404).send({ status: 'error', message: 'User not found' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:auth',
      message: 'ℹ️ User found successfully',
      user,
    });

    res.status(200).send({ status: 'success', data: user });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:auth',
      message: '❌ Something went wrong!',
      error,
    });

    res.status(204).send({ status: 'error', error });
  }
};

export const register = async (req: Request, res: Response) => {
  const user: User = req.body;

  try {
    const newUser = await addUser(user);

    if (!newUser) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:auth',
        message: '⚠️ New user was not created',
      });

      res.status(404).send({ status: 'error', message: 'New user was not created' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:auth',
      message: 'ℹ️ User created successfully',
      newUser,
    });

    res.status(200).send({ status: 'success', data: newUser });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:auth',
      message: '❌ Something went wrong!',
      error,
    });

    res.status(204).send({ status: 'error', error });
  }
};
