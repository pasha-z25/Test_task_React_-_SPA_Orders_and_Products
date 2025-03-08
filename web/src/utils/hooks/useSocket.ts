import { useEffect, useState } from 'react';
import socket from '../socket';
import { WebSocketEvents } from '../types';

export const useSocket = () => {
  const [sessionCount, setSessionCount] = useState<number>(0);

  useEffect(() => {
    const handleSessionCount = (count: number) => {
      console.log('!!! handleSessionCount', count);
      setSessionCount(count);
    };

    socket.on(WebSocketEvents.SESSION_COUNT, handleSessionCount);
    socket.on(WebSocketEvents.WEB_TRIGGER_READ_ONE_ORDER, (data) => {
      console.log('Order updated, need to refresh data', data);
    });
    socket.on(WebSocketEvents.WEB_TRIGGER_READ_ALL_ORDERS, (data) => {
      console.log('Order info was triggered', data);
    });

    return () => {
      socket.off(WebSocketEvents.SESSION_COUNT, handleSessionCount);
      socket.off(WebSocketEvents.WEB_TRIGGER_READ_ONE_ORDER);
      socket.off(WebSocketEvents.WEB_TRIGGER_READ_ONE_ORDER);
    };
  }, []);

  return { socket, sessionCount };
};

// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { getWebSocketUrl } from '../helpers';

// const SOCKET_URL = getWebSocketUrl();

// export const useSocket = () => {
//   const [socket, setSocket] = useState<any>(null);
//   const [sessionCount, setSessionCount] = useState<number>(0);

//   useEffect(() => {
//     const newSocket = io(SOCKET_URL, {
//       path: '/socket.io/',
//     });

//     newSocket.on('connect', () => {
//       console.log('Connected to WebSocket:', newSocket.id);
//     });

//     newSocket.on('sessionCount', (count) => {
//       setSessionCount(count);
//     });

//     newSocket.on('orderUpdated', (data) => {
//       console.log('Order updated, need to refresh data', data);
//     });

//     newSocket.on('getOrderInfo', (data) => {
//       console.log('Order info was triggered', data);
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return { socket, sessionCount };
// };

// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000', {
//   path: '/api/socket',
// });

// export function useSocket() {
//   const [activeSessions, setActiveSessions] = useState(0);

//   useEffect(() => {
//     socket.on('activeSessions', (count) => {
//       setActiveSessions(count);
//     });

//     return () => {
//       socket.off('activeSessions');
//     };
//   }, []);

//   return { socket, activeSessions };
// }
