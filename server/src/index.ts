import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { AppDataSource } from './db';
import { authRoutes, ordersRoutes, productsRoutes } from './routes';
import { serverListenerLogger } from './utils/helpers';
import { LOG_LEVEL, logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.json());

app.get('/meta', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/products', productsRoutes);

app.use('/api/orders', ordersRoutes);

app.use('/api/auth', authRoutes);

app.listen(PORT, () => serverListenerLogger(PORT));

AppDataSource.initialize()
  .then(() => {
    logger.log({
      level: LOG_LEVEL.INFO,
      scope: 'db:initialize',
      message: 'Database connected successfully',
    });
    console.log('📦 Database connected successfully');
    app.listen(PORT, () => {
      serverListenerLogger(PORT);
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    logger.log({
      level: LOG_LEVEL.ERROR,
      scope: 'db:initialize',
      message: 'Database connection failed',
      error,
    });
    console.error('❌ Database connection failed', error);
  });
