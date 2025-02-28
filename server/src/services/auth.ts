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

dayjs.extend(customParseFormat);

const app = express();
app.use(bodyParser.json());

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const login = async (email: string, password: string) => {
  const user = await userRepository.findOneBy({ email });
  if (!user) return Promise.reject({ message: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return Promise.reject({ message: 'Invalid password' });

  const payload = {
    sub: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

  return { accessToken: token };
};
