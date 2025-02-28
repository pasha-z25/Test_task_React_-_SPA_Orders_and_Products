import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db';
import { User } from '../db/entities';

dayjs.extend(customParseFormat);

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const login = async (email: string, password: string) => {
  const user = await userRepository.findOneBy({ email });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
};
