export interface Product {
  id: number;
  serialNumber: number;
  isNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: { value: number; symbol: string; isDefault: boolean }[];
  date: string;
}

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products: number[];
}

const products: Product[] = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: true,
    photo: 'pathToFile.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: false },
      { value: 2600, symbol: 'UAH', isDefault: true },
    ],
    date: '2017-06-29 12:09:33',
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: true,
    photo: 'pathToFile.jpg',
    title: 'Product 2',
    type: 'Monitors',
    specification: 'Specification 2',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 200, symbol: 'USD', isDefault: false },
      { value: 5200, symbol: 'UAH', isDefault: true },
    ],
    date: '2017-06-29 12:09:33',
  },
];

const orders: Order[] = [
  {
    id: 1,
    title: 'Order 1',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: [1],
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: [2],
  },
  {
    id: 3,
    title: 'Order 3',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: [1, 2],
  },
];

export { orders, products };
