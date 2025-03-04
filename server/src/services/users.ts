import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db';
import { User } from '../db/entities';
import {
  BCRYPT_SALT_ROUNDS,
  CUSTOM_DATE_TIME_FORMAT,
  USER_AVATAR_SOURCE,
} from '../utils/constants';
import { LOG_LEVEL, logger } from '../utils/logger';
import { UserGender } from '../utils/types';

dayjs.extend(customParseFormat);

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const getUser = async (userId: number) => {
  try {
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ['orders'],
    });
    if (!user) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'services:users',
      message: '❌ Something went wrong!',
      error,
    });
    return Promise.reject(error);
  }
};

export const getUsers = async () => {
  try {
    const users = await userRepository.find({ relations: ['orders'] });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...safeUser }) => safeUser);
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'services:users',
      message: '❌ Something went wrong!',
      error,
    });
    return Promise.reject(error);
  }
};

export const addUser = async ({
  email = '',
  password = '',
  name = '',
  gender = UserGender.MALE,
  phone = '',
  address = '',
}: User) => {
  try {
    const user = await userRepository.findOne({
      where: { email },
    });

    if (user) {
      return await Promise.reject({
        message: 'The user with such an email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const newUser = new User();
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.name = name;
    newUser.orders = [];
    newUser.gender = gender;
    newUser.avatar = `${USER_AVATAR_SOURCE}&seed=${name.replace(/ /g, '')}`;
    newUser.phone = phone;
    newUser.address = address;
    newUser.registered = dayjs(new Date()).format(CUSTOM_DATE_TIME_FORMAT);
    newUser.active = true;

    return await userRepository.save(newUser);
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'services:users',
      message: '❌ Something went wrong!',
      error,
    });
    return Promise.reject(error);
  }
};

export const updateUser = async (
  userId: number,
  updatedData: Partial<User>
) => {
  try {
    await userRepository.update(userId, updatedData);
    return await getUser(userId);
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'services:users',
      message: '❌ Something went wrong!',
      error,
    });
    return Promise.reject(error);
  }
};
