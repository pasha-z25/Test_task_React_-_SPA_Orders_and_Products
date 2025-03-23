export type AnyObj = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum WebSocketEvents {
  SESSION_COUNT = 'sessionCount',
  BACKEND_ONE_ORDER_UPDATED = 'backendOneOrderUpdated',
  BACKEND_ONE_ORDER_DELETED = 'backendOneOrderDeleted',
  WEB_TRIGGER_READ_ALL_ORDERS = 'webTriggerReadAllOrders',
  WEB_TRIGGER_READ_ONE_ORDER = 'wenTriggerReadOneOrder',
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
