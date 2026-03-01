import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
  getNotificationsByRecipientId,
  saveTicketMessage,
  updateNotificationStatus,
} from './helpers.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://etutor4me.com',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());

const hostname = '0.0.0.0';
const port = 5000;

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('join', async userId => {
    socket.join(userId);

    try {
      const notificationData = await getNotificationsByRecipientId(userId);
      socket.emit('user_notifications', {
        type: 'initial_load',
        message: `Loaded ${notificationData.count} notifications`,
        success: notificationData.success,
        notifications: notificationData.notifications,
        count: notificationData.count,
        unreadCount: notificationData.unreadCount,
      });
    } catch (error) {
      socket.emit('user_notifications_error', {
        message: 'Failed to load notifications',
        error: error.message,
      });
    }
  });

  socket.on('leave', userId => {
    console.log(`User ${userId} left`);
    socket.leave(userId);
  });

  // Handle joining ticket rooms
  socket.on('joinTicketRoom', ticketId => {
    console.log(`User joined ticket room: ${ticketId}`);
    socket.join(`ticket_${ticketId}`);
  });

  // Handle leaving ticket rooms
  socket.on('leaveTicketRoom', ticketId => {
    console.log(`User left ticket room: ${ticketId}`);
    socket.leave(`ticket_${ticketId}`);
  });

  socket.on('ticketMessage', async messageData => {
    const { ticketId, senderId, message, timestamp } = messageData;

    try {
      const savedMessageResponse = await saveTicketMessage(ticketId, senderId, message);

      if (savedMessageResponse.success) {
        io.to(`ticket_${ticketId}`).emit('ticketMessage', {
          ticketId,
          message: savedMessageResponse.message,
        });
      } else {
        console.error('Failed to save message:', savedMessageResponse.error);
        // Still broadcast the message even if save fails (for immediate feedback)
        io.to(`ticket_${ticketId}`).emit('ticketMessage', {
          ticketId,
          message: {
            senderId,
            message,
            createdAt: timestamp,
            ticketId,
          },
        });
      }
    } catch (error) {
      console.error('Error handling ticket message:', error);
      // Fallback: broadcast the message even if there's an error
      io.to(`ticket_${ticketId}`).emit('ticketMessage', {
        ticketId,
        message: {
          senderId,
          message,
          createdAt: timestamp,
          ticketId,
        },
      });
    }
  });

  socket.on('updateNotificationStatus', async data => {
    const { notificationId, userId } = data;

    try {
      const updateResult = await updateNotificationStatus(notificationId, userId);

      if (updateResult.success) {
        socket.emit('notificationStatusUpdated', {
          type: 'initial_load',
          message: `Loaded ${updateResult.count} notifications`,
          success: updateResult.success,
          notifications: updateResult.notifications,
          count: updateResult.count,
          unreadCount: updateResult.unreadCount,
        });
      } else {
        socket.emit('notificationStatusUpdateError', {
          success: false,
          error: updateResult.error || 'Failed to update notification status',
        });
      }
    } catch (error) {
      socket.emit('notificationStatusUpdateError', {
        success: false,
        error: error.message || 'Failed to update notification status',
      });
    }
  });

  // Listen for incoming messages from the client
  socket.on('chatMessage', message => {
    console.log('Message from client:', message);
    const { recipientId, content, senderId, fileUrl, fileType, fileName, timestamp } = message;

    // Emit to the recipient's socket room
    io.to(recipientId).emit('chatMessage', {
      senderId,
      recipientId,
      content,
      fileUrl,
      fileType,
      fileName,
      timestamp,
    });

    // Optionally, you can also emit to the sender's room (for confirmation)
    io.to(senderId).emit('chatMessage', {
      senderId,
      recipientId,
      content,
      fileUrl,
      fileType,
      fileName,
      timestamp,
    });

    io.to(recipientId).emit('notification', {
      senderId,
      content,
      fileUrl,
      fileType,
      fileName,
      timestamp,
    });
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
