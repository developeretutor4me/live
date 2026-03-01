import { NextRequest, NextResponse } from 'next/server';
import Ticket from '../../models/Ticket';
import { connectMongoDB } from '../../connection/connection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectMongoDB();
    const userId = session?.user?.id;

    const tickets = await Ticket.find({ userId }).populate(
      'userId',
      'firstName lastName email profilePicture'
    );

    return NextResponse.json({ success: true, tickets }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
