export type AnyObj = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export interface IPageProps {
  params: {
    lng: Lang;
    id?: string;
  };
  searchParams: AnyObj;
}

export enum Lang {
  EN = 'en',
  UA = 'ua',
  RU = 'ru',
}

export type ApiOptionsType = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
};

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

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
  user: User;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  gender: UserGender;
  avatar: string;
  phone?: string | null;
  address?: string | null;
  orders: Order[];
  registered: string;
  active: boolean;
}
