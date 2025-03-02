import { fallbackLng } from '@/i18n/utils';
import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import ru from 'dayjs/locale/ru';
import ua from 'dayjs/locale/uk';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BROWSER_API_URL, DOCKER_API_URL } from './constants';
import { ApiClient, ApiOptionsType, Lang } from './types';

dayjs.extend(customParseFormat);

export const getFormattedDateAndTime = (lang: Lang, format: string, date?: Date) => {
  const currentLanguage = {
    [Lang.EN]: en,
    [Lang.UA]: ua,
    [Lang.RU]: ru,
  };

  return typeof dayjs().locale(currentLanguage[fallbackLng]).format === 'function'
    ? dayjs(date ? date : new Date())
        .locale(currentLanguage[lang] || currentLanguage[fallbackLng])
        .format(format)
    : dayjs(date ? date : new Date()).toISOString();
};

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getApiUrl = () => {
  return typeof window === 'undefined' ? DOCKER_API_URL : BROWSER_API_URL;
};

export const client: ApiClient = async (path, options) => {
  const REQUEST_URL = `${getApiUrl()}${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: ApiOptionsType = {
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

client.get = function (endpoint: string, config = {}) {
  return client(endpoint, config);
};

client.post = function (endpoint: string, body: BodyInit, config = {}) {
  return client(endpoint, { ...config, body });
};

client.delete = function (endpoint: string, config = {}) {
  return client(endpoint, { ...config, method: 'DELETE' });
};

client.patch = function (endpoint: string, body: BodyInit, config = {}) {
  return client(endpoint, { ...config, body, method: 'PATCH' });
};
