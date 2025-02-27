export interface Product {
  id: number;
  serialNumber: number;
  isNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: Date;
    end: Date;
  };
  price: { value: number; symbol: string; isDefault: boolean }[];
  date: Date;
}

export interface Order {
  id: number;
  title: string;
  date: Date;
  description: string;
  products: number[];
  user: User;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  orders?: Order[];
}
