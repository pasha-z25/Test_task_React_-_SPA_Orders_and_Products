import { createServer } from 'http';
import { Server } from 'socket.io';
import { WEB_CLIENT_ORIGINS } from './constants';
import { WebSocketEvents } from './types';

const PORT = process.env.PORT || 5000;

const server = createServer();
const io = new Server(server, { cors: { origin: '*' } });

let activeSessions = 0;

io.on('connection', (socket) => {
  console.log('🔌 New WebSocket connection');

  const headersOrigin = socket.handshake.headers.origin || '';

  if (WEB_CLIENT_ORIGINS.includes(headersOrigin)) {
    activeSessions++;
    io.emit(WebSocketEvents.SESSION_COUNT, activeSessions);
  }

  socket.on('connect_error', (socket) => {
    activeSessions--;
    console.log('🔌 WebSocket connect_error', socket);
  });

  socket.on('disconnect', (socket) => {
    console.log('🔌 WebSocket disconnect', socket);
    if (WEB_CLIENT_ORIGINS.includes(headersOrigin)) {
      activeSessions--;
      io.emit(WebSocketEvents.SESSION_COUNT, activeSessions);
    }
  });

  socket.on(WebSocketEvents.BACKEND_ONE_ORDER_UPDATED, (data) => {
    console.log('ℹ️ The order has been updated, need to refresh data', data);
    io.emit(WebSocketEvents.WEB_TRIGGER_READ_ONE_ORDER, {
      type: 'order:update',
      data,
    });
  });

  socket.on(WebSocketEvents.BACKEND_ONE_ORDER_DELETED, (data) => {
    console.log('ℹ️ The order has been deleted, need to refresh data', data);
    io.emit(WebSocketEvents.WEB_TRIGGER_READ_ALL_ORDERS, {
      type: 'order:delete',
      data,
    });
  });
});

server.listen(PORT, () =>
  console.log(`✅ WebSocket is working on port ${PORT} 🚀`)
);
