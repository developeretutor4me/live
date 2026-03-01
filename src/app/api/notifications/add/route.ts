import { NextRequest, NextResponse } from 'next/server';
import Notification from '../../models/Notification';
import { notificationsListTypes } from '@/data/constant';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipient, sender, title, type, message, link } = body;

    if (!recipient || !sender || !title || !type || !message) {
      return NextResponse.json(
        {
          message: 'Required fields are missing.',
        },
        { status: 400 }
      );
    }

    if (!notificationsListTypes.includes(type)) {
      return NextResponse.json(
        {
          error: `Invalid notification type. Must be one of: ${notificationsListTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const notification = new Notification({
      recipient: recipient,
      sender: sender,
      title: title,
      type,
      message,
      link: link || null,
      isRead: false,
    });

    await notification.save();

    return NextResponse.json(
      {
        message: 'Notification created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
