import { User } from '@/db/entities';
import { getRepository } from '@/db/repository';
import * as userService from '@/services/users';
import { handleError } from '@/utils/helpers';
import { UserGender } from '@/utils/types';
import * as bcrypt from 'bcryptjs';
import * as dayjs from 'dayjs';

jest.mock('@/db/repository');
jest.mock('@/utils/helpers');
jest.mock('bcryptjs');
jest.mock('dayjs', () => {
  const actualDayjs = jest.requireActual('dayjs');
  const mockDayjs = jest.fn((...args) => {
    const instance = actualDayjs(...args);
    instance.extend = jest.fn();
    return instance;
  });
  return mockDayjs;
});

describe('user service', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockUserRepository: any;

  const userId = 1;
  const user: User = {
    id: userId,
    email: 'test@example.com',
    password: 'secret',
    name: 'Test',
    gender: UserGender.MALE,
    avatar: '',
    orders: [],
    registered: '',
    active: false,
    phone: '',
    address: '',
  };
  const safeUser: Partial<User> = {
    id: userId,
    email: 'test@example.com',
    name: 'Test',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };
    (getRepository as jest.Mock).mockReturnValue(mockUserRepository);
    (handleError as jest.Mock).mockImplementation((scope, error) => {
      // Логуємо помилку і повертаємо відхилений проміс
      return Promise.reject(error);
    });
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (dayjs as unknown as jest.Mock).mockReturnValue({
      format: jest.fn().mockReturnValue('2023-01-01 12:00:00'),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getUser', () => {
    it('should return a user without password', async () => {
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(user);

      const result = await userService.getUser(userId);

      expect(result).toEqual(safeUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['orders'],
      });
    });

    it('should return null if user not found', async () => {
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);

      const result = await userService.getUser(userId);

      expect(result).toBeNull();
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['orders'],
      });
    });

    // it('should reject and handle error on failure', async () => {
    //   const error = new Error('DB error');
    //   (mockUserRepository.findOne as jest.Mock).mockRejectedValue(error);

    //   await expect(userService.getUser(userId)).rejects.toThrow('DB error');
    //   expect(handleError).toHaveBeenCalledWith('services:users', error);
    // });
  });

  describe('getUsers', () => {
    it('should return all users without passwords', async () => {
      const users = [
        {
          id: 1,
          email: 'test1@example.com',
          password: 'secret1',
          name: 'Test1',
          gender: 'MALE',
          avatar: '',
          orders: [],
          registered: '',
          active: false,
          phone: '',
          address: '',
        },
        {
          id: 2,
          email: 'test2@example.com',
          password: 'secret2',
          name: 'Test2',
          gender: 'MALE',
          avatar: '',
          orders: [],
          registered: '',
          active: false,
          phone: '',
          address: '',
        },
      ];
      const safeUsers = [
        { id: 1, email: 'test1@example.com', name: 'Test1' },
        { id: 2, email: 'test2@example.com', name: 'Test2' },
      ];
      (mockUserRepository.find as jest.Mock).mockResolvedValue(users);

      const result = await userService.getUsers();

      expect(result).toEqual(safeUsers);
      expect(mockUserRepository.find).toHaveBeenCalledWith({
        relations: ['orders'],
      });
    });

    // it('should reject and handle error on failure', async () => {
    //   const error = new Error('DB error');
    //   (mockUserRepository.find as jest.Mock).mockRejectedValue(error);

    //   await expect(userService.getUsers()).rejects.toThrow('DB error');
    //   expect(handleError).toHaveBeenCalledWith('services:users', error);
    // });
  });

  describe('addUser', () => {
    it('should create and save a new user', async () => {
      const userData: User = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        gender: UserGender.MALE,
        phone: '123456789',
        address: '123 Street',
        id: 0,
        avatar: '',
        orders: [],
        registered: '',
        active: false,
      };
      const newUser = {
        ...userData,
        id: 1,
        password: 'hashedPassword',
        orders: [],
        avatar: 'https://some-source.com/avatar&seed=TestUser', // Залежить від USER_AVATAR_SOURCE
        registered: '2023-01-01 12:00:00',
        active: true,
      };
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);
      (mockUserRepository.save as jest.Mock).mockResolvedValue(newUser);

      const result = await userService.addUser(userData); // Використовуємо userData, а не user

      expect(result).toBe(newUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: userData.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(
        userData.password,
        expect.any(Number)
      );
      expect(mockUserRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          email: userData.email,
          password: 'hashedPassword',
          name: userData.name,
          gender: userData.gender,
          phone: userData.phone,
          address: userData.address,
          orders: [],
          avatar: expect.stringContaining('&seed=TestUser'),
          registered: '2023-01-01 12:00:00',
          active: true,
        })
      );
    });

    it('should reject if user with email already exists', async () => {
      const userData: User = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        gender: UserGender.MALE,
        phone: '123456789',
        address: '123 Street',
        id: 0,
        avatar: '',
        orders: [],
        registered: '',
        active: false,
      };
      const existingUser = { id: 1, email: 'test@example.com' };
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(existingUser);

      await expect(userService.addUser(userData)).rejects.toEqual({
        message: 'The user with such an email already exists',
      });
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: userData.email },
      });
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    // it('should reject and handle error on failure', async () => {
    //   const userData: User = {
    //     email: 'test@example.com',
    //     password: 'password123',
    //     name: 'Test User',
    //     gender: UserGender.MALE,
    //     phone: '123456789',
    //     address: '123 Street',
    //     id: 0,
    //     avatar: '',
    //     orders: [],
    //     registered: '',
    //     active: false
    //   };
    //   const error = new Error('DB error');
    //   (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);
    //   (mockUserRepository.save as jest.Mock).mockRejectedValue(error);

    //   await expect(userService.addUser(userData)).rejects.toThrow('DB error');
    //   expect(handleError).toHaveBeenCalledWith('services:users', error);
    // });
  });

  describe('updateUser', () => {
    it('should update a user and return updated user', async () => {
      const userId = 1;
      const updatedData = { name: 'Updated User' };
      const updatedUser = {
        id: userId,
        name: 'Updated User',
        email: 'test@example.com',
      };
      (mockUserRepository.update as jest.Mock).mockResolvedValue(undefined);
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue({
        ...updatedUser,
        password: 'secret',
      });

      const result = await userService.updateUser(userId, updatedData);

      expect(result).toEqual(updatedUser);
      expect(mockUserRepository.update).toHaveBeenCalledWith(
        userId,
        updatedData
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['orders'],
      });
    });

    // it('should reject and handle error on failure', async () => {
    //   const userId = 1;
    //   const updatedData = { name: 'Updated User' };
    //   const error = new Error('DB error');
    //   (mockUserRepository.update as jest.Mock).mockRejectedValue(error);

    //   await expect(userService.updateUser(userId, updatedData)).rejects.toThrow('DB error');
    //   expect(handleError).toHaveBeenCalledWith('services:users', error);
    // });
  });
});
