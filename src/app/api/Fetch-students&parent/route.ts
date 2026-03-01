export const dynamic = 'force-dynamic';


import { connectMongoDB } from '../connection/connection';
import StudentModel from '../models/Student';
import ParentModel from '../models/Parent';
import RequestModel from '../models/Request'; // Import the Request model
import { NextResponse } from 'next/server';
import TeacherModel from '../models/Teacher';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  try {
    // Connect to MongoDB
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    await connectMongoDB();

    // Fetch all students and populate user details
    const students = await StudentModel.find()
      .populate({
        path: 'user',
        select: '-password'
        
      })
      .lean(); // Converts to plain JavaScript objects

    // Fetch all parents and populate user details
    const parents = await ParentModel.find()
      .populate({
        path: 'user',
        select: '-password',
      })
      .lean();

    // Fetch all requests related to students and parents
    const teacherId = await session?.user.id; 
    
    
    const requests = await RequestModel.find().lean();

    // Combine students, parents, and requests into a single response object
    const response = {
      students,
      parents,
      requests, // Include the requests in the response
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching students, parents, or requests:', error.message, error.stack);
      return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    } else {
      console.error('An unknown error occurred');
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
