/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyObj = {
  [key: string]: any;
};

export interface IPageProps {
  params: Promise<{
    lng: Lang;
    id?: string;
  }>;
  searchParams: Promise<AnyObj>;
}

export interface IViewProps {
  lang: Lang;
  id?: string | number;
}

export enum Lang {
  EN = 'en',
  UA = 'ua',
  RU = 'ru',
}

export interface ApiOptionsType extends RequestInit {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

export interface ApiClient {
  (path: string, options?: ApiOptionsType): Promise<any>;
  get: (endpoint: string, config?: ApiOptionsType) => Promise<any>;
  post: (
    endpoint: string,
    body: BodyInit,
    config?: ApiOptionsType
  ) => Promise<any>;
  delete: (endpoint: string, config?: ApiOptionsType) => Promise<any>;
  patch: (
    endpoint: string,
    body: BodyInit,
    config?: ApiOptionsType
  ) => Promise<any>;
}

export interface ApiEndpoints {
  authLogin: string;
  allUsers: string;
  oneUser: (id: string | number) => string;
  allOrders: string;
  oneOrder: (id: string | number) => string;
  allProducts: string;
  oneProduct: (id: string | number) => string;
}

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
  order: Order;
}

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products: Product[];
  user: User;
}

export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  gender: UserGender;
  avatar: string;
  phone?: string | null;
  address?: string | null;
  orders: Order[];
  registered: string;
  active: boolean;
}
