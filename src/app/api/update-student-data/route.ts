import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '../connection/connection'; // MongoDB connection utility
import StudentModel from '../models/Student'; // Student model import
import { getServerSession } from 'next-auth';
import {authOptions} from '@/app/auth/auth'; 

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    await connectMongoDB(); // Ensure DB connection

    const body = await req.json();
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Find the student associated with the userId
    const student = await StudentModel.findOne({ user: userId });

    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    // Extract fields from request body
    const { grade, subjects, personalInformation, additionalInformation, firstName, lastName } = body;

    // Update only provided fields, leave others unchanged
    if (grade) student.grade = grade;
    if (subjects) student.subjects = subjects;
    if (personalInformation) {
      student.personalInformation = {
        ...student.personalInformation, // Retain existing values
        ...personalInformation, // Overwrite only the provided fields
      };
    }
    if (additionalInformation) student.additionalInformation = additionalInformation;
    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;

    // Save the updated student document
    const updatedStudent = await student.save();

    return NextResponse.json(updatedStudent, { status: 200 });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
