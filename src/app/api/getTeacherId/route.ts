// pages/api/getTeacherId.ts
export const dynamic = 'force-dynamic';
import { connectMongoDB } from '../connection/connection';
import UserModel from '../models/User';
import TeacherModel from '../models/Teacher'; // Import the Teacher model
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Find the user by userId
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Find the teacher associated with this user
    const teacher = await TeacherModel.findOne({ user: userId }).select('_id'); // Select only the _id field
    if (!teacher) {
      return NextResponse.json({ message: 'Teacher not found for this user' }, { status: 404 });
    }

    // Return the teacherId
    return NextResponse.json({ teacherId: teacher._id }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching teacher ID:', error.message, error.stack);
      return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    } else {
      console.error('An unknown error occurred');
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
