import os from 'os';

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  const networkURL = networkIP ? `http://${networkIP}:${PORT}` : 'Not available';

  console.log('\x1b[36m%s\x1b[0m', '   Express.js');
  console.log(`   - Local:        ${localURL}`);
  console.log(`   - Network:      ${networkURL}`);
  console.log('   ');
}

export default {
  getLocalIP,
  serverListenerLogger,
};
