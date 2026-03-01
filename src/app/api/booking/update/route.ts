import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../connection/connection';
import Booking from '@/app/api/models/Booking';

export async function PUT(request: NextRequest) {
  try {
    await connectMongoDB();

    const body = await request.json();
    const { bookingId, date, time, timeZone, duration, StudentNote, subjects, level } = body;

    if (!timeZone) {
      return NextResponse.json(
        { success: false, message: 'Please Select a Time Zone' },
        { status: 400 }
      );
    }

    if (!bookingId || !date || !time || !timeZone || !subjects || !level) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const getBookingRequest = await Booking.findById(bookingId);
    if (!getBookingRequest) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }

    const updatedBooking = await Booking.updateOne(
      { _id: bookingId },
      {
        $set: {
          date,
          time,
          timeZone,
          duration,
          StudentNote,
          subjects,
          level,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking,
    });
  } catch (error: any) {
    console.error('Error updating booking:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: 'Duplicate entry found',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
