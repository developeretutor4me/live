import { NextRequest, NextResponse } from 'next/server';
import Ticket from '../../models/Ticket';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const userId = session?.user?.id;
    const { topic, additionalComments } = await req.json();

    const ticket = await Ticket.create({
      userId,
      topic,
      additionalComments,
    });

    return NextResponse.json({ success: true, ticket }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
