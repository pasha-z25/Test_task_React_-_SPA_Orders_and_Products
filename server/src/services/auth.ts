import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import express from 'express';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db';
import { User } from '../db/entities';
import { JWT_SECRET_KEY } from '../utils/constants';
import { LOG_LEVEL, logger } from '../utils/logger';

dayjs.extend(customParseFormat);

const app = express();
app.use(bodyParser.json());

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const login = async (email: string, userPassword: string) => {
  try {
    const user = await userRepository.findOneBy({ email });
    if (!user) return Promise.reject({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(userPassword, user.password);
    if (!isPasswordValid)
      return Promise.reject({ message: 'Invalid password' });

    const payload = {
      sub: user.id,
      email: user.email,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

    return { user: safeUser, accessToken: token };
  } catch (error) {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'services:auth',
      message: '❌ Something went wrong!',
      error,
    });
    return Promise.reject(error);
  }
};
