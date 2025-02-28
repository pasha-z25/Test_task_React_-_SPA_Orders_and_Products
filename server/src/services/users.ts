import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db';
import { User } from '../db/entities';
import { BCRYPT_SALT_ROUNDS, CUSTOM_DATE_TIME_FORMAT } from '../utils/constants';

dayjs.extend(customParseFormat);

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const getUser = async (userId: number) => {
  return await userRepository.findOne({ where: { id: userId } });
};

export const getUsers = async () => {
  return await userRepository.find();
};

export const addUser = async ({
  email = '',
  password = '',
  name = '',
  gender,
  avatar = '',
  phone = '',
  address = '',
}: User) => {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  const newUser = new User();
  newUser.email = email;
  newUser.password = hashedPassword;
  newUser.name = name;
  newUser.orders = [];
  newUser.gender = gender || '';
  newUser.avatar = avatar;
  newUser.phone = phone;
  newUser.address = address;
  newUser.registered = dayjs(new Date()).format(CUSTOM_DATE_TIME_FORMAT);
  newUser.active = true;

  return await userRepository.save(newUser);
};

export const updateUser = async (userId: number, updatedData: Partial<User>) => {
  await userRepository.update(userId, updatedData);
  return await getUser(userId);
};
