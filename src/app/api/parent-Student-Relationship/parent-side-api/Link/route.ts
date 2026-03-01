import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '@/app/api/connection/connection';
import User from '@/app/api/models/User';
import Parent from '@/app/api/models/Parent';
import Student from '@/app/api/models/Student';
import ParentStudentRelationship from '@/app/api/models/ParentStudentRelation';
import { NextApiRequest } from 'next';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { parentUserId, studentEmail, requestedBy } = await req.json();
    console.log('Check : ', parentUserId, studentEmail, requestedBy);

    if (!parentUserId) {
      return NextResponse.json({ error: 'Parent user ID is required.' }, { status: 400 });
    }

    if (!studentEmail) {
      return NextResponse.json({ error: 'Student email is required.' }, { status: 400 });
    }

    if (!requestedBy) {
      return NextResponse.json({ error: 'RequestedBy (user ID) is required.' }, { status: 400 });
    }

    // Find the parent user
    const parentUser = await User.findById(parentUserId);

    if (!parentUser || parentUser.role !== 'parent') {
      return NextResponse.json({ error: 'Invalid or non-existent parent user.' }, { status: 404 });
    }

    // Find the parent in the Parent model
    const parent = await Parent.findOne({ user: parentUser._id });

    if (!parent) {
      return NextResponse.json({ error: 'Parent details not found.' }, { status: 404 });
    }

    // Find the student user by email
    const studentUser = await User.findOne({ email: studentEmail });

    if (!studentUser || studentUser.role !== 'student') {
      return NextResponse.json({ error: 'Invalid or non-existent student user.' }, { status: 404 });
    }

    // Find the student in the Student model
    const student = await Student.findOne({ user: studentUser._id });

    if (!student) {
      return NextResponse.json({ error: 'Student details not found.' }, { status: 404 });
    }

    console.log(student);

    // Check if a relationship already exists
    const existingRelationship = await ParentStudentRelationship.findOne({
      parent: parent._id,
      student: student._id,
    });

    if (existingRelationship) {
      return NextResponse.json(
        { error: 'A relationship already exists between this parent and student.' },
        { status: 400 }
      );
    }

    // Create the Parent-Student relationship
    const relationship = new ParentStudentRelationship({
      parent: parent._id,
      student: student._id,
      requestedBy,
    });

    await relationship.save();

    return NextResponse.json({
      message: 'Parent and student linked successfully.',
      relationship,
    });
  } catch (error) {
    console.error('Error in linking parent and student:', error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
