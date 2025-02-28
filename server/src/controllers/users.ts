import { Request, Response } from 'express';
import { User } from '../db/entities';
import {
  addUser as addUserHelper,
  getUser as getUserHelper,
  getUsers as getUsersHelper,
  updateUser as updateUserHelper,
} from '../services';
import { LOG_LEVEL, logger } from '../utils/logger';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsersHelper();

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
      users,
    });

    res.status(200).send({ status: 'success', data: users });
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

export const getUserById = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  try {
    const user = await getUserHelper(userId);

    if (!user) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:users',
        message: '⚠️ User not found',
      });

      res.status(404).send({ status: 'error', message: 'User not found' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:users',
      message: 'ℹ️ User found successfully',
      user,
    });

    res.status(200).send({ status: 'success', data: user });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:users',
      message: '❌ Something went wrong!',
      error,
    });

    res.status(204).send({ status: 'error', error });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const user: User = req.body;

  try {
    const newUser = await addUserHelper(user);

    if (!newUser) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:users',
        message: '⚠️ New user was not created',
      });

      res.status(404).send({ status: 'error', message: 'New user was not created' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:users',
      message: 'ℹ️ New user was created',
      user: newUser,
    });

    res.status(200).send({ status: 'success', data: newUser });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:users',
      message: '❌ Something went wrong!',
      error,
    });

    res.status(204).send({ status: 'error', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);
  const user: User = req.body;

  try {
    const updatedUser = await updateUserHelper(userId, user);

    if (!updatedUser) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:users',
        message: '⚠️ User was not updated',
      });

      res.status(404).send({ status: 'error', message: 'User was not updated' });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:users',
      message: 'ℹ️ User was updated',
      user: updatedUser,
    });

    res.status(200).send({ status: 'success', data: updatedUser });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:users',
      message: '❌ Something went wrong!',
      error,
    });

    res.status(204).send({ status: 'error', error });
  }
};
