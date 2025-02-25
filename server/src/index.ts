import express, { Request, Response } from 'express';
import { serverListenerLogger } from './utils/helpers';

import { orders, products } from './data';

const app = express();
const PORT = 8888;


app.get('/', (req: Request, res: Response) => {
  console.log(orders, products);
  res.send('Hello World!');
});



app.listen(PORT, () => serverListenerLogger(PORT));
