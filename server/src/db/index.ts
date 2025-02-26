import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Order, Product, User } from './entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'test_db',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  entities: [User, Order, Product],
});
