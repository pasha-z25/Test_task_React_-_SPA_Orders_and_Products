import { User } from '@/db/entities';
import {
  addUser as addUserHelper,
  getUser as getUserHelper,
  getUsers as getUsersHelper,
  updateUser as updateUserHelper,
} from '@/services';
import { getRequestInfo } from '@/utils/helpers';
import { LOG_LEVEL, logger } from '@/utils/logger';
import { ResponseStatus } from '@/utils/types';
import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersHelper();

    if (!users) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:auth',
        message: '⚠️ Users not found',
        requestInfo: getRequestInfo(req),
      });

      res.status(404).send({
        status: ResponseStatus.ERROR,
        error: { message: 'Users not found' },
      });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:auth',
      message: 'ℹ️ Users found successfully',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: users });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:auth',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(400).send({ status: ResponseStatus.ERROR, error });
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
        requestInfo: getRequestInfo(req),
      });

      res.status(404).send({
        status: ResponseStatus.ERROR,
        error: { message: 'User not found' },
      });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:users',
      message: 'ℹ️ User found successfully',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: user });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:users',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(400).send({ status: ResponseStatus.ERROR, error });
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
        requestInfo: getRequestInfo(req),
      });

      res.status(404).send({
        status: ResponseStatus.ERROR,
        error: { message: 'New user was not created' },
      });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:users',
      message: 'ℹ️ New user was created',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: newUser });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:users',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(400).send({ status: ResponseStatus.ERROR, error });
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
        requestInfo: getRequestInfo(req),
      });

      res.status(404).send({
        status: ResponseStatus.ERROR,
        error: { message: 'User was not updated' },
      });
      return;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controller:users',
      message: 'ℹ️ User was updated',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: updatedUser });
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controller:users',
      message: '❌ Something went wrong!',
      requestInfo: getRequestInfo(req),
      error,
    });

    res.status(400).send({ status: ResponseStatus.ERROR, error });
  }
};
