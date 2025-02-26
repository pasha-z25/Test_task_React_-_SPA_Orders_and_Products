import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { authRoutes, ordersRoutes, productsRoutes } from './routes';
import { serverListenerLogger } from './utils/helpers';

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
