import { NextRequest, NextResponse } from 'next/server';
import BookingModel from '../../models/Booking';
import GroupBookingModel from '../../models/GroupBooking';
import mongoose from 'mongoose';
import { connectMongoDB } from '../../connection/connection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    const userId = session?.user.id;

    const body = await req.json();
    const { teacherId, level, sessions } = body;

    if (!teacherId || !level || !sessions) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: studentId, teacherId, subjects, level, and sessions',
        },
        { status: 400 }
      );
    }

    if (sessions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Sessions are required',
        },
        { status: 400 }
      );
    }

    console.log('sessions', sessions);
    console.log('teacherId', teacherId);
    console.log('level', level);
    console.log('userId', userId);

    try {
      const bookingIds: string[] = [];
      const createdBookings = [];

      // Create all bookings
      for (const sessionData of sessions) {
        const { date, time, timeZone, duration, studentNote, subjects } = sessionData;

        const booking = new BookingModel({
          student: new mongoose.Types.ObjectId(userId),
          teacher: new mongoose.Types.ObjectId(teacherId),
          subjects: subjects,
          level: level,
          date: new Date(date),
          time: time,
          timeZone: timeZone || '',
          duration: duration,
          StudentNote: studentNote || '',
          status: 'pending',
          meetingCompleted: false,
          IsTrialSession: false,
          isGroupBooking: true,
        });

        const savedBooking = await booking.save();
        bookingIds.push(savedBooking._id?.toString() || '');
        createdBookings.push(savedBooking);
      }

      const groupBooking = new GroupBookingModel({
        bookingsIds: bookingIds,
      });

      const savedGroupBooking = await groupBooking.save();

      return NextResponse.json(
        {
          success: true,
          message: 'Group booking created successfully',
          data: {
            bookings: createdBookings,
            bookingIds: bookingIds,
            totalSessions: bookingIds.length,
            totalCost: 0.0,
            groupBookingId: savedGroupBooking._id?.toString(),
            groupBooking: savedGroupBooking,
          },
        },
        { status: 201 }
      );
    } catch (error) {
      throw error;
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create group booking',
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
