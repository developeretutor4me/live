import { NextRequest, NextResponse } from 'next/server';
import Notification from '../../models/Notification';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const recipientId = searchParams.get('recipientId');
    if (!recipientId) {
      return NextResponse.json(
        {
          error: 'Recipient id is required',
        },
        { status: 400 }
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
      notifications,
      count: notifications.length,
      unreadCount,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
