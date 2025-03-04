import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { LOG_LEVEL, logger } from '../utils/logger';
import { Order, Product, User } from './entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres_db_server',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'test_db',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'testing',
  entities: [User, Order, Product],
});

const initializeWithRetry = async (retries = 5, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await AppDataSource.initialize();
      logger.log({
        level: LOG_LEVEL.INFO,
        scope: 'db:initialize:retry',
        message: `📦 Database connected successfully in ${i + 1} attempt`,
      });
      return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.log({
        level: LOG_LEVEL.ERROR,
        scope: 'db:initialize:retry',
        message: `❌ Database connection attempt ${i + 1} failed:`,
      });
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export { initializeWithRetry };
