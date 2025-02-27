import { Request, Response } from 'express';
import { addUser, getUser, getUsers } from '../services';
import { LOG_LEVEL, logger } from '../utils/logger';
import { User } from '../utils/types';

export const users = async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();

    if (!users) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:auth',
        message: '⚠️ Users not found',
      });

      res.status(404).send({ status: 'error', message: 'Users not found' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:auth',
      message: 'ℹ️ Users found successfully',
    });

    res.status(200).send({ status: 'success', users });
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
    const user = await getUser(email, password);

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

    res.status(200).send({ status: 'success', user });
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

    res.status(200).send({ status: 'success', user: newUser });
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
