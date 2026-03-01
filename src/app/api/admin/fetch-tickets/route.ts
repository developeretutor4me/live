export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/api/connection/connection';
import Ticket from '@/app/api/models/Ticket';
import UserModel from '@/app/api/models/User';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // Connect to the database
    await connectMongoDB();

    // Fetch all tickets and populate user details
    const tickets = await Ticket.find()
      .populate({
        path: 'userId',
        select: 'firstName lastName email profilePicture',
      })
      .populate({
        path: 'assignedTo',
        select: 'name',
      })
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean();

    return NextResponse.json({ success: true, data: tickets }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
