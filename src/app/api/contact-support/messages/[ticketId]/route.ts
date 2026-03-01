import { NextRequest, NextResponse } from 'next/server';
import Message from '@/app/api/models/TicketMessage';
import AssistantAdmin from '@/app/api/models/AssistantAdmin';
import Admin from '@/app/api/models/Admin';
import User from '@/app/api/models/User';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

export async function GET(req: NextRequest, { params }: any) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    // }

    const { ticketId } = params;
    const messages = await Message.find({ ticketId }).sort({ createdAt: 1 });

    // const uniqueUserIds = Array.from(new Set(messages.map((message: any) => message.senderId)));
    // console.log('uniqueUserIds : ', uniqueUserIds);
    // let users = null;
    // let assistantAdmin = null;
    // uniqueUserIds.forEach(async (id: any) => {
    //   const getAssistantAdmin = await Admin.findById(id);
    //   if (getAssistantAdmin) {
    //     console.log('getAssistantAdmin : ', getAssistantAdmin);
    //   } else {
    //     const getUser = await User.findById(id);
    //     if (getUser) {
    //       console.log('getUser : ', getUser);
    //     }
    //   }
    // });

    return NextResponse.json(
      {
        success: true,
        messages,
        count: messages.length,
        ticketId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
