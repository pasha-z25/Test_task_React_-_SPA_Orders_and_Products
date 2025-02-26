import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db';
import { User } from '../db/entities';
import { BCRYPT_SALT_ROUNDS } from '../utils/constants';
import { User as UserType } from '../utils/types';

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const getUser = async (email: string, password: string) => {
  const user = await userRepository.findOneBy({ email });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
};

export const getUsers = async () => {
  return await userRepository.find();
};

export const addUser = async ({ email = '', password = '', name = '' }: UserType) => {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  const newUser = new User();
  newUser.email = email;
  newUser.password = hashedPassword;
  newUser.name = name;
  newUser.orders = [];

  return await userRepository.save(newUser);
};
