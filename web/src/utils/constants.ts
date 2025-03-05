import { ApiEndpoints } from './types';

export const HEADER_SITE_NAME = 'Inventory';

export const DOCKER_API_URL =
  process.env.API_URL || 'http://backend_server:8888/api';

export const BROWSER_API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888/api';

export const API_URL =
  typeof window === 'undefined' ? DOCKER_API_URL : BROWSER_API_URL;

export const authRoutes = ['login', 'register'];

export const apiEndpoints: ApiEndpoints = {
  authLogin: '/auth/login',
  allOrders: '/orders',
  oneOrder: (id: string | number) => `/orders/${id}`,
  allProducts: '/products',
  oneProduct: (id: string | number) => `/products/${id}`,
  allUsers: '/users',
  oneUser: (id: string | number) => `/users/${id}`,
};

export const NUMBER_OF_MONTHS_IN_YEAR = 12;

export const HEADER_DATE_FORMAT = 'DD MMM, YYYY 🕒 HH:mm';

export const USER_CARD_DATE_FORMAT = 'DD MMMM YYYY';

export const ORDER_CARD_DATE_FORMAT = 'DD/MMM/YYYY';
