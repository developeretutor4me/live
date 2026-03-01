import { connectMongoDB } from '../connection/connection';
import TeacherModel from '../models/Teacher';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import {authOptions} from '@/app/auth/auth'; // Update with your actual path

export async function POST(req: Request) {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Get the session to access the user ID
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized: No session found' },
        { status: 401 }
      );
    }

    const userId = session.user.id; // Adjust based on how you store user ID in session

    // Find the teacher associated with the userId
    const teacher = await TeacherModel.findOne({ user: userId });

    if (!teacher) {
      return NextResponse.json(
        { message: 'Teacher not found' },
        { status: 404 }
      );
    }

    // Increment the totalBooking field by 1
    const updatedTeacher = await TeacherModel.findByIdAndUpdate(
      teacher._id,
      { $inc: { totalbooking: 1 } }, // Increment totalbooking by 1
      { new: true } // Return the updated document
    );

    return NextResponse.json(
      { message: 'Total bookings updated', teacher: updatedTeacher },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating total bookings:', error.message, error.stack);
      return NextResponse.json(
        { message: 'Internal server error', error: error.message },
        { status: 500 }
      );
    } else {
      console.error('An unknown error occurred');
      return NextResponse.json(
        { message: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
