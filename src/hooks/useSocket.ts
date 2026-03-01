import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useToast } from './use-toast';

interface SocketConfig {
  userId: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: any) => void;
  onNotificationStatusUpdated?: (data: any) => void;
  onNotificationStatusUpdateError?: (error: any) => void;
  onUserNotifications?: (data: any) => void;
  onUserNotificationsError?: (error: any) => void;
  onTicketMessage?: (data: any) => void;
  onChatMessage?: (data: any) => void;
  onNotification?: (data: any) => void;
}

interface SocketConnectionResult {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  updateNotificationStatusHandler: (notificationId: string) => void;
  joinTicketRoom: (ticketId: string) => void;
  leaveTicketRoom: (ticketId: string) => void;
  sendTicketMessage: (messageData: any) => void;
  sendChatMessage: (messageData: any) => void;
  disconnect: () => void;
}

// const SOCKET_URL = 'https://etutor4me-production.up.railway.app'
const SOCKET_URL = 'https://etutor4me.com:5000';

export const useSocket = (config: SocketConfig): SocketConnectionResult => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize socket connection
  useEffect(() => {
    if (!config.userId) return;

    setIsConnecting(true);
    setError(null);

    const socketInstance = io(SOCKET_URL, {
      withCredentials: true,
    });

    // Connection events
    socketInstance.on('connect', () => {
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);

      socketInstance.emit('join', config.userId);

      console.log('Socket connected successfully');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      setIsConnecting(false);

      console.log('Socket disconnected');
    });

    socketInstance.on('connect_error', err => {
      setIsConnected(false);
      setIsConnecting(false);
      setError(err.message);

      if (config.onError) {
        config.onError(err);
      }

      console.error('Socket connection error:', err);
    });

    socketInstance.on('user_notifications', data => {
      if (config.onUserNotifications) {
        config.onUserNotifications(data);
      }
    });

    socketInstance.on('user_notifications_error', error => {
      if (config.onUserNotificationsError) {
        config.onUserNotificationsError(error);
      }
    });

    socketInstance.on('notificationStatusUpdated', data => {
      if (config.onUserNotifications) {
        config.onUserNotifications(data);
      }
    });

    socketInstance.on('notificationStatusUpdateError', error => {
      if (config.onUserNotificationsError) {
        config.onUserNotificationsError(error);
      }
    });

    // Chat events
    socketInstance.on('ticketMessage', data => {
      if (config.onTicketMessage) {
        config.onTicketMessage(data);
      }
    });

    socketInstance.on('chatMessage', data => {
      if (config.onChatMessage) {
        config.onChatMessage(data);
      }
    });

    socketInstance.on('notification', data => {
      if (config.onNotification) {
        config.onNotification(data);
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.emit('leave', config.userId);
      socketInstance.disconnect();
      setSocket(null);
      setIsConnected(false);
      setIsConnecting(false);
    };
  }, [config.userId, toast]);

  const updateNotificationStatusHandler = useCallback(
    (notificationId: string) => {
      if (!socket || !config.userId) {
        console.error('Socket or user ID not available');
        return;
      }

      try {
        socket.emit('updateNotificationStatus', {
          notificationId: notificationId,
          userId: config.userId,
        });
      } catch (error) {
        console.error('Error emitting notification status update:', error);
      }
    },
    [socket, config.userId]
  );

  const joinTicketRoom = useCallback(
    (ticketId: string) => {
      if (!socket) {
        console.error('Socket not available');
        return;
      }

      socket.emit('joinTicketRoom', ticketId);
      console.log(`Joined ticket room: ${ticketId}`);
    },
    [socket]
  );

  const leaveTicketRoom = useCallback(
    (ticketId: string) => {
      if (!socket) {
        console.error('Socket not available');
        return;
      }

      socket.emit('leaveTicketRoom', ticketId);
      console.log(`Left ticket room: ${ticketId}`);
    },
    [socket]
  );

  const sendTicketMessage = useCallback(
    (messageData: any) => {
      if (!socket) {
        console.error('Socket not available');
        return;
      }

      socket.emit('ticketMessage', messageData);
      console.log('Ticket message sent via socket');
    },
    [socket]
  );

  const sendChatMessage = useCallback(
    (messageData: any) => {
      if (!socket) {
        console.error('Socket not available');
        return;
      }

      socket.emit('chatMessage', messageData);
      console.log('Chat message sent via socket');
    },
    [socket]
  );

  const disconnect = useCallback(() => {
    if (socket) {
      socket.emit('leave', config.userId);
      socket.disconnect();
    }
  }, [socket, config.userId]);

  return {
    socket,
    isConnected,
    isConnecting,
    error,
    updateNotificationStatusHandler,
    joinTicketRoom,
    leaveTicketRoom,
    sendTicketMessage,
    sendChatMessage,
    disconnect,
  };
};
