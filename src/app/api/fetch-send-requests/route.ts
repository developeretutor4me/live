// app/api/get-incoming-requests/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import BookingModel from '../models/Booking';
import { connectMongoDB } from '../connection/connection';
import { authOptions } from '@/app/auth/auth';
import StudentModel from '@/app/api/models/Parent';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const userId = session?.user.id;

    await connectMongoDB();

    const bookingRequests = await BookingModel.find({
      student: userId, // Match the student ID only, no status filter
    })
      .populate({
        path: 'student',
        select: 'name email',
      })
      .populate({
        path: 'teacher', // Populate teacher data
        populate: {
          path: 'user', // Populate the user field within teacher
        },
      })
      .lean();

    return NextResponse.json({ bookingRequests }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching incoming booking requests:', error.message, error.stack);
      return NextResponse.json(
        { error: 'Internal server error', details: error.message },
        { status: 500 }
      );
    } else {
      console.error('An unknown error occurred');
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
