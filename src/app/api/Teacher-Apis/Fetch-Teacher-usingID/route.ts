// app/api/teachers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../connection/connection'; // Adjust the import path as necessary
import TeacherModel from '../../models/Teacher'; // Import the Teacher model

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB(); // Ensure the database is connected

    // Parse the request body to get teacherId
    const { teacherId } = await req.json();

    // Validate teacherId presence
    if (!teacherId) {
      return NextResponse.json({ error: 'Teacher ID is required' }, { status: 400 });
    }

    // Fetch the teacher by teacherId from the database
    const teacher = await TeacherModel.findById(teacherId).populate({
      path: 'user',
      select: '-password',
    });

    // Check if the teacher was found
    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    // Return the teacher data
    return NextResponse.json({ teacher });
  } catch (error) {
    console.error('Error fetching teacher:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
