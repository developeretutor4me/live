export const dynamic = 'force-dynamic';



import { connectMongoDB } from '../../connection/connection';  // Adjust the path as needed
import TeacherModel from '../../models/Teacher';  // Adjust the import path based on your project structure
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';  // NextAuth session import
import { authOptions } from '@/app/auth/auth';

export async function GET(req: Request) {
  try {
    // Get the session to retrieve the user ID
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      // If there's no session or user ID, return an error response
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id; // Get user ID from session

    // Connect to the MongoDB database
    await connectMongoDB();

    // Fetch the teacher by userId and populate the user details in the teacher model
    const teacher = await TeacherModel.findOne({ user: userId }) // Find teacher by userId
      .populate({
        path: 'user',  // Populate the user field in the Teacher model
        model: 'User'  // Specify the model to populate (User model in this case)
      })
      .lean();  // Convert to plain JavaScript objects

    // If no teacher is found, return a 404 response
    if (!teacher) {
      return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    }

    // Return the populated teacher data
    return NextResponse.json(teacher, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching teacher:', error.message, error.stack);
      return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    } else {
      console.error('An unknown error occurred');
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
