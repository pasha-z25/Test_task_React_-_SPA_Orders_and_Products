import { BROWSER_API_URL, DOCKER_API_URL } from './constants';
import { ApiOptionsType } from './types';

export const getApiUrl = () => {
  return typeof window === 'undefined' ? DOCKER_API_URL : BROWSER_API_URL;
};

export const client = async (path: string, options?: ApiOptionsType) => {
  const REQUEST_URL = `${getApiUrl()}${path}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method: options?.body ? 'POST' : 'GET',
    ...options,
    headers: {
      ...headers,
      ...(options?.headers || {}),
    },
  };

  try {
    const response = await fetch(REQUEST_URL, config);

    if (!response.ok) throw new Error('Something went wrong!');

    const { data } = await response.json();

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Promise.reject(error.message);
  }
};
