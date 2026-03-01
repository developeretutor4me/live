import { io, Socket } from 'socket.io-client';

const SOCKET_URL =
  process.env.NODE_ENV === 'production' ? 'https://etutor4me.com:5000' : 'http://localhost:5000';

interface SocketConnectionOptions {
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
  socket: Socket;
  isConnected: boolean;
  updateNotificationStatus: (notificationId: string) => void;
  joinTicketRoom: (ticketId: string) => void;
  leaveTicketRoom: (ticketId: string) => void;
  sendTicketMessage: (messageData: any) => void;
  sendChatMessage: (messageData: any) => void;
  disconnect: () => void;
}

export const createSocketConnection = (
  options: SocketConnectionOptions
): SocketConnectionResult => {
  const socket = io(SOCKET_URL, {
    withCredentials: true,
  });

  let isConnected = false;

  // Connection events
  socket.on('connect', () => {
    isConnected = true;
    socket.emit('join', options.userId);

    if (options.onConnect) {
      options.onConnect();
    }

    console.log('Socket connected successfully for user:', options.userId);
  });

  socket.on('disconnect', () => {
    isConnected = false;

    if (options.onDisconnect) {
      options.onDisconnect();
    }

    console.log('Socket disconnected for user:', options.userId);
  });

  socket.on('connect_error', err => {
    isConnected = false;

    if (options.onError) {
      options.onError(err);
    }

    console.error('Socket connection error for user:', options.userId, err);
  });

  // Notification events
  socket.on('notificationStatusUpdated', data => {
    if (options.onNotificationStatusUpdated) {
      options.onNotificationStatusUpdated(data);
    }
  });

  socket.on('notificationStatusUpdateError', error => {
    if (options.onNotificationStatusUpdateError) {
      options.onNotificationStatusUpdateError(error);
    }
  });

  socket.on('user_notifications', data => {
    if (options.onUserNotifications) {
      options.onUserNotifications(data);
    }
  });

  socket.on('user_notifications_error', error => {
    if (options.onUserNotificationsError) {
      options.onUserNotificationsError(error);
    }
  });

  // Chat events
  socket.on('ticketMessage', data => {
    if (options.onTicketMessage) {
      options.onTicketMessage(data);
    }
  });

  socket.on('chatMessage', data => {
    if (options.onChatMessage) {
      options.onChatMessage(data);
    }
  });

  socket.on('notification', data => {
    if (options.onNotification) {
      options.onNotification(data);
    }
  });

  // Socket methods
  const updateNotificationStatus = (notificationId: string) => {
    if (!isConnected || !options.userId) {
      console.error('Socket not connected or user ID not available');
      return;
    }

    try {
      socket.emit('updateNotificationStatus', {
        notificationId: notificationId,
        userId: options.userId,
      });

      console.log('Notification status update requested via socket for:', notificationId);
    } catch (error) {
      console.error('Error emitting notification status update:', error);
    }
  };

  const joinTicketRoom = (ticketId: string) => {
    if (!isConnected) {
      console.error('Socket not connected');
      return;
    }

    socket.emit('joinTicketRoom', ticketId);
    console.log(`Joined ticket room: ${ticketId}`);
  };

  const leaveTicketRoom = (ticketId: string) => {
    if (!isConnected) {
      console.error('Socket not connected');
      return;
    }

    socket.emit('leaveTicketRoom', ticketId);
    console.log(`Left ticket room: ${ticketId}`);
  };

  const sendTicketMessage = (messageData: any) => {
    if (!isConnected) {
      console.error('Socket not connected');
      return;
    }

    socket.emit('ticketMessage', messageData);
    console.log('Ticket message sent via socket');
  };

  const sendChatMessage = (messageData: any) => {
    if (!isConnected) {
      console.error('Socket not connected');
      return;
    }

    socket.emit('chatMessage', messageData);
    console.log('Chat message sent via socket');
  };

  const disconnect = () => {
    if (isConnected) {
      socket.emit('leave', options.userId);
      socket.disconnect();
    }
  };

  return {
    socket,
    isConnected,
    updateNotificationStatus,
    joinTicketRoom,
    leaveTicketRoom,
    sendTicketMessage,
    sendChatMessage,
    disconnect,
  };
};

// Export a simple function that just creates and returns a socket connection
export const getSocketConnection = (userId: string): Socket => {
  const socket = io(SOCKET_URL, {
    withCredentials: true,
  });

  socket.on('connect', () => {
    socket.emit('join', userId);
    console.log('Socket connected for user:', userId);
  });

  return socket;
};
