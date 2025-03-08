import { io, Socket } from 'socket.io-client';
import { getWebSocketUrl } from './helpers';

const SOCKET_URL = getWebSocketUrl();

const socket: Socket = io(SOCKET_URL, {
  path: '/socket.io/',
  autoConnect: true,
  reconnection: true,
});

export default socket;
