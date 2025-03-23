import { useEffect, useState } from 'react';
import socket from '../socket';
import { WebSocketEvents } from '../types';

export const useSocket = () => {
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    // Додаємо загальний слухач для всіх подій
    socket.onAny((event, ...args) => {
      console.log('ℹ️ Received event:', event, args);
    });

    const handleConnect = () => {
      console.log('🔌 WEB: WebSocket successfully connected!', socket.id);
      setIsConnected(true);
    };

    const handleConnectError = (error: Error) => {
      console.error('🔌 WEB: WebSocket connection failed:', error.message);
      setIsConnected(false);
    };

    const handleDisconnect = (reason: string) => {
      console.log('🔌 WEB: WebSocket disconnected:', reason);
      setIsConnected(false);
    };

    const handleSessionCount = (count: number) => {
      setSessionCount(count);
    };

    socket.on('connect', handleConnect);
    socket.on('connect_error', handleConnectError);
    socket.on('disconnect', handleDisconnect);
    socket.on(WebSocketEvents.SESSION_COUNT, handleSessionCount);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('connect_error', handleConnectError);
      socket.off('disconnect', handleDisconnect);
      socket.off(WebSocketEvents.SESSION_COUNT, handleSessionCount);
    };
  }, []);

  return {
    socket,
    sessionCount,
    isConnected,
  };
};
