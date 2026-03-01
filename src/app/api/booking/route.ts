// app/api/book-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import BookingModel from '../models/Booking'; // Adjust path as necessary
import { connectMongoDB } from '../connection/connection';
import { authOptions } from '@/app/auth/auth'; // Adjust path to your NextAuth options

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const studentId = session?.user.id;

    const { teacherId, level, date, time, timeZone, duration, subjects, studentnote } =
      await req.json();

    const newBooking = new BookingModel({
      student: studentId,
      teacher: teacherId,
      subjects,
      level,
      date,
      time,
      status: 'pending',
      meetingCompleted: false,
      startLink: '',
      joinLink: '',
      StudentNote: studentnote || '',
      IsTrialSession: true,
      isGroupBooking: false,
      duration,
      timeZone: timeZone || '',
    });

    await newBooking.save();

    return NextResponse.json(
      { message: 'Booking request sent successfully', booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in booking API:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Internal server error', details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
