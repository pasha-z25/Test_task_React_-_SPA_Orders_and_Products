import { Request } from 'express';
import os from 'os';
import { LOG_LEVEL, logger } from './logger';

export function getRandomInt(min: number, max: number) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

export const getRequestInfo = (req: Request) => ({
  method: req.method,
  url: req.originalUrl,
  baseUrl: req.baseUrl,
  referer: req.get('Referer'),
  origin: req.get('Origin'),
  userAgent: req.get('User-Agent'),
  secure: req.secure,
  query: req.query,
  headers: req.headers,
  body: req.body,
});

export function getLocalIP(): string | null {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    for (const net of interfaces[key]!) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

export function serverListenerLogger(PORT: string | number): void {
  const localURL = `http://localhost:${PORT}`;
  const networkIP = getLocalIP();
  const networkURL = networkIP
    ? `http://${networkIP}:${PORT}`
    : 'Not available';

  console.log(
    '\x1b[36m%s\x1b[0m',
    '   Express.js 🚀 Server running successfully'
  );
  console.log(`   - Local:        ${localURL}`);
  console.log(`   - Network:      ${networkURL}`);
  console.log('   ');
}

export const handleError = (scope: string, error: unknown, params = {}) => {
  logger.log({
    level: LOG_LEVEL.ERROR,
    scope,
    message: '❌ Something went wrong!',
    error,
    ...params,
  });
};

export default {
  getLocalIP,
  getRandomInt,
  getRequestInfo,
  serverListenerLogger,
};
