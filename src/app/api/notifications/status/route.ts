import { NextRequest, NextResponse } from 'next/server';
import Notification from '../../models/Notification';

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get('notificationId');
    const recipientId = searchParams.get('recipientId');

    console.log('notificationId', notificationId);
    console.log('recipientId', recipientId);

    if (!notificationId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Notification ID is required',
        },
        { status: 400 }
      );
    }

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          error: 'Notification not found',
        },
        { status: 404 }
      );
    }

    const notifications = await Notification.find({ recipient: recipientId })
      .sort({ createdAt: -1 })
      .populate('recipient', 'email')
      .populate('sender', 'email')
      .lean();

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return NextResponse.json({
      success: true,
      message: 'Notification marked as read',
      notifications,
      count: notifications.length,
      unreadCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to update notification status' },
      { status: 500 }
    );
  }
}
