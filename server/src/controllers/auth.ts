import { addUser, getUser } from '../services';
import { LOG_LEVEL, logger } from '../utils/logger';
import { User } from '../utils/types';

export const login = async ({ email, password }: Partial<User>) => {
  try {
    if (!email || !password) {
      logger.log({
        level: LOG_LEVEL.ERROR,
        scope: 'controllers:auth',
        message: 'Email or password is empty',
      });
      return null;
    }
    const currentUser = await getUser(email, password);
    if (!currentUser) {
      logger.log({
        level: LOG_LEVEL.ERROR,
        scope: 'controllers:auth',
        message: 'User not found',
      });
      return null;
    }

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controllers:auth',
      message: 'User created successfully',
      currentUser,
    });

    return currentUser;
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controllers:auth',
      message: 'Something went wrong!',
      error,
    });
  }
  return 'Login successful';
};

export const register = async (user: User) => {
  try {
    const newUser = await addUser(user);

    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'controllers:auth',
      message: 'User created successfully',
      newUser,
    });

    return newUser;
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'controllers:auth',
      message: 'Something went wrong!',
      error,
    });
  }
};
