import axios from 'axios';

const BASE_API_URL = 'https://etutor4me.com/api';

export const saveTicketMessage = async (ticketId, senderId, message) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/contact-support/messages`,
      {
        ticketId,
        senderId,
        message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to save ticket message:', error.response?.data || error.message);
    return { success: false, message: error.message };
  }
};

export const getNotificationsByRecipientId = async userId => {
  try {
    const getAllNotifications = await axios.get(
      `${BASE_API_URL}/notifications/by-recipient-id?recipientId=${userId}`
    );

    const data = await getAllNotifications.data;

    return {
      success: true,
      notifications: data.notifications,
      count: data.count,
      unreadCount: data.unreadCount,
    };
  } catch (error) {
    return {
      success: false,
      notifications: [],
      count: 0,
      unreadCount: 0,
      error: 'Failed to fetch notifications',
    };
  }
};

export const updateNotificationStatus = async (notificationId, recipientId) => {
  try {
    const response = await axios.put(
      `${BASE_API_URL}/notifications/status?notificationId=${notificationId}&recipientId=${recipientId}`,
      {}
    );

    const data = await response.data;

    if (data.success) {
      return {
        success: true,
        notifications: data.notifications,
        count: data.count,
        unreadCount: data.unreadCount,
      };
    }

    return {
      success: false,
      notifications: [],
      count: 0,
      unreadCount: 0,
      error: 'Failed to update notification status',
    };
  } catch (error) {
    return {
      success: false,
      notifications: [],
      count: 0,
      unreadCount: 0,
      error: 'Failed to update notification status',
    };
  }
};
