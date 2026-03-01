import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Parent from '@/app/api/models/Parent'; // Path to your Parent model
import Student from '@/app/api/models/Student'; // Path to your Student model
import ParentStudentRelationship from '@/app/api/models/ParentStudentRelation'; // Path to your relationship model
import User from '@/app/api/models/User'; // Path to your User model
import { connectMongoDB } from '@/app/api/connection/connection'; // MongoDB connection utility

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
    }

    // Connect to the database
    await connectMongoDB();

    // Step 1: Find the student using the user ID
    const student = await Student.findOne({ user: userId });
    if (!student) {
      return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 });
    }

    // Step 2: Find the parent-student relationship using the student ID
    const relationship = await ParentStudentRelationship.findOne({ student: student._id }).populate('parent');
    if (!relationship || !relationship.parent) {
      return NextResponse.json({ success: false, message: 'Parent relationship not found' }, { status: 404 });
    }

    // Step 3: Find the user details of the parent
    const parentUser = await User.findById(relationship.parent.user).select('_id email');
    if (!parentUser) {
      return NextResponse.json({ success: false, message: 'Parent user not found' }, { status: 404 });
    }

    // Step 4: Return the parent user email and ID
    return NextResponse.json({ success: true, user: parentUser }, { status: 200 });

  } catch (error) {
    console.error('Error fetching parent:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
