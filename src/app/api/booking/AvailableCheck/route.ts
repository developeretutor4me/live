import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Booking from '../../models/Booking'; // Adjust the import path for your Booking model
import {connectMongoDB} from '../../connection/connection'; // Adjust the import path for your MongoDB connection function

export async function GET() {
  try {
    
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch bookings with only `date`, `time`, and `teacher` fields
    const bookings = await Booking.find(
      { meetingCompleted: false }, // Only fetch bookings where meetingCompleted is false
      'date time teacher'
    ).lean();

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error:any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
