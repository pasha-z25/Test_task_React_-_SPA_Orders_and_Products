import { createServer } from 'http';
import { Server } from 'socket.io';
import { WebSocketEvents } from './types';

const PORT = process.env.PORT || 5000;

const server = createServer();
const io = new Server(server, { cors: { origin: '*' } });

let activeSessions = 0;

io.on('connection', (socket) => {
  console.log('🔌 New WebSocket connection');

  activeSessions++;
  io.emit(WebSocketEvents.SESSION_COUNT, activeSessions);

  socket.on('disconnect', () => {
    activeSessions--;
    io.emit(WebSocketEvents.SESSION_COUNT, activeSessions);
  });

  socket.on(WebSocketEvents.BACKEND_ALL_ORDERS_READ, (data) => {
    console.log('Отримано запит на замовлення:', data);
    io.emit(WebSocketEvents.WEB_TRIGGER_READ_ALL_ORDERS, { type: 'io.emit' });
  });

  socket.on(WebSocketEvents.BACKEND_ONE_ORDER_UPDATED, (data) => {
    console.log('Order updated, need to refresh data', data);
    io.emit(WebSocketEvents.WEB_TRIGGER_READ_ONE_ORDER, { type: 'io.emit' });
  });
});

server.listen(PORT, () =>
  console.log(`✅ WebSocket is working on port ${PORT}`)
);
