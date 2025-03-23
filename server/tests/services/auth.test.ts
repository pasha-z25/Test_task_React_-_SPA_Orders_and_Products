import { User } from '@/db/entities';
import { getRepository } from '@/db/repository';
import { login } from '@/services/auth';
import { logger } from '@/utils/logger';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

jest.mock('@/db/repository');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('@/utils/logger');

describe('login service', () => {
  let mockUserRepository: Partial<Repository<User>>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUserRepository = {
      findOneBy: jest.fn(),
    };

    (getRepository as jest.Mock).mockReturnValue(mockUserRepository);
  });

  it('should return user and token on successful login', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const hashedPassword = 'hashedPassword';
    const user = {
      id: 1,
      email,
      password: hashedPassword,
      name: 'Test User',
    };
    const token = 'mockedToken';

    (mockUserRepository.findOneBy as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(token);

    const result = await login(email, password);

    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(jwt.sign).toHaveBeenCalledWith(
      { sub: user.id, email: user.email },
      expect.any(String),
      { expiresIn: '1h' }
    );
    expect(result).toEqual({
      user: { id: 1, email, name: 'Test User' },
      accessToken: token,
    });
  });

  it('should reject with "User not found" if user does not exist', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    (mockUserRepository.findOneBy as jest.Mock).mockResolvedValue(null);

    await expect(login(email, password)).rejects.toEqual({
      message: 'User not found',
    });
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it('should reject with "Invalid password" if password is wrong', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const user = {
      id: 1,
      email,
      password: 'hashedPassword',
    };

    (mockUserRepository.findOneBy as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(login(email, password)).rejects.toEqual({
      message: 'Invalid password',
    });
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashedPassword');
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it('should log error and reject on unexpected error', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const error = new Error('Database error');

    (mockUserRepository.findOneBy as jest.Mock).mockRejectedValue(error);
    (logger.log as jest.Mock).mockImplementation(() => {});

    await expect(login(email, password)).rejects.toBe(error);
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
    expect(logger.log).toHaveBeenCalledWith({
      level: 'error',
      scope: 'services:auth',
      message: '❌ Something went wrong!',
      error,
    });
  });
});
