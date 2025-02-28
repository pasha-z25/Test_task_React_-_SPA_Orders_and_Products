import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './db';
import { authRoutes, ordersRoutes, productsRoutes, usersRoutes } from './routes';
import { serverListenerLogger } from './utils/helpers';
import { LOG_LEVEL, logger } from './utils/logger';

dotenv.config();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://frontend_web:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const PORT = process.env.PORT || 8888;
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/api/products', productsRoutes);

app.use('/api/orders', ordersRoutes);

app.use('/api/users', usersRoutes);

app.use('/api/auth', authRoutes);

AppDataSource.initialize()
  .then(() => {
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'db:initialize',
      message: '📦 Database connected successfully',
    });
    app.listen(PORT, () => serverListenerLogger(PORT));
  })
  .catch((error: unknown) => {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'db:initialize',
      message: '❌ Database connection failed',
      error,
    });
  });
