import { User } from '@/db/entities';
import { getRepository } from '@/db/repository';
import { JWT_SECRET_KEY } from '@/utils/constants';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import express from 'express';
import jwt from 'jsonwebtoken';

dayjs.extend(customParseFormat);

const app = express();
app.use(bodyParser.json());

export const login = async (email: string, userPassword: string) => {
  try {
    const userRepository = getRepository(User);
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
    return Promise.reject(error);
  }
};
