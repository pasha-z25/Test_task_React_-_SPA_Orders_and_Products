export const DOCKER_API_URL = process.env.API_URL || 'http://backend_server:8888/api';

export const BROWSER_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888/api';

export const API_URL = typeof window === 'undefined' ? DOCKER_API_URL : BROWSER_API_URL;

export const apiEndpoints = {
  authLogin: '/auth/login',
};
