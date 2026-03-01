import { NextRequest, NextResponse } from 'next/server';
import Messagemodel from '@/app/api/models/TicketMessage';
import Ticket from '@/app/api/models/Ticket';
import { connectMongoDB } from '@/app/api/connection/connection';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    // }

    await connectMongoDB();
    const { ticketId, senderId, message } = await req.json();

    const ticket = await Ticket.findById(ticketId);
    if (!ticket)
      return NextResponse.json({ success: false, message: 'Ticket not found' }, { status: 404 });

    if (ticket.status === 'closed') {
      return NextResponse.json({ success: false, message: 'Chat is closed' }, { status: 403 });
    }

    const newMessage = new Messagemodel({ ticketId, senderId, message });

    const savedMessage = await newMessage.save();

    return NextResponse.json({ success: true, message: savedMessage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
