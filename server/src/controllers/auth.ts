import { Request, Response } from 'express';
import { User } from '../db/entities';
import { addUser, login as loginHelper } from '../services';
import { getRequestInfo } from '../utils/helpers';
import { LOG_LEVEL, logger } from '../utils/logger';
import { ResponseStatus } from '../utils/types';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    logger.log({
      level: LOG_LEVEL.WARN,
      scope: 'controller:auth',
      message: '⚠️ Email or password is empty',
      requestInfo: getRequestInfo(req),
    });

    res.status(400).send({
      status: ResponseStatus.ERROR,
      error: { message: 'Email or password is empty' },
    });
    return;
  }

  try {
    const user = await loginHelper(email, password);

    if (!user) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:auth',
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
      scope: 'controller:auth',
      message: 'ℹ️ User found successfully',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: user });
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

export const register = async (req: Request, res: Response) => {
  const user: User = req.body;

  try {
    const newUser = await addUser(user);

    if (!newUser) {
      logger.log({
        level: LOG_LEVEL.WARN,
        scope: 'controller:auth',
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
      scope: 'controller:auth',
      message: 'ℹ️ User created successfully',
      requestInfo: getRequestInfo(req),
    });

    res.status(200).send({ status: ResponseStatus.SUCCESS, data: newUser });
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
