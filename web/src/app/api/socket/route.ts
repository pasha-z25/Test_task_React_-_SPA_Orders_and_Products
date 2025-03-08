import { NextRequest } from 'next/server';
import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer();
const io = new Server(server, {
  path: '/api/socket',
  cors: { origin: '*' },
});

let activeSessions = 0;

io.on('connection', (socket) => {
  activeSessions++;
  io.emit('activeSessions', activeSessions);

  socket.on('disconnect', () => {
    activeSessions--;
    io.emit('activeSessions', activeSessions);
  });

  socket.on('dataUpdated', (type: 'orders' | 'products') => {
    io.emit('refreshData', type);
  });
});

server.listen(5000);

export async function GET(req: NextRequest) {
  return new Response('WebSocket server running', { status: 200 });
}
