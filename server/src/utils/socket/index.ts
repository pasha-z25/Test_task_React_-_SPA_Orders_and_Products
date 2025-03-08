import { WebSocketEvents } from '@/utils/types';
import { io } from 'socket.io-client';

const DEFAULT_SOCKET_URL = 'http://websocket:5000';

const SOCKET_URL = process.env.SOCKET_URL || DEFAULT_SOCKET_URL;

const socket = io(SOCKET_URL);

socket.on('connect', () => {
  console.log('🔌 BACKEND: Connected to WebSocket server:', socket.id);
});

socket.on(WebSocketEvents.SESSION_COUNT, (count) => {
  console.log('Active sessions:', count);
});

export default socket;
