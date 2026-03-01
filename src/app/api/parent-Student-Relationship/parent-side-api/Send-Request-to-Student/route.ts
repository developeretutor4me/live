import { NextRequest, NextResponse } from 'next/server';
import {connectMongoDB} from '../../../connection/connection';
import ParentStudentRelationship from '../../../models/ParentStudentRelation';
import Parent from '../../../models/Parent';
import Student from '../../../models/Student';

export const POST = async (req: NextRequest) => {
  try {
    const { userId, studentId } = await req.json(); // userId and studentId received from frontend

    // Connect to the database
    await connectMongoDB();

    // Find the parent by userId
    const parent = await Parent.findOne({ user: userId });

    if (!parent) {
      return NextResponse.json({ message: 'Parent not found' }, { status: 404 });
    }

    // Find the student by studentId
    const student = await Student.findById(studentId);

    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    // Create the relationship request
    const relationship = await ParentStudentRelationship.create({
      parent: parent._id,
      student: studentId,
      status: 'pending', // The initial status is pending
      requestedBy: parent._id,
    });

    return NextResponse.json({ message: 'Request sent successfully', relationship }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};