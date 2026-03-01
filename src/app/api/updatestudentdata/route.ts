import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '../connection/connection';
import User from '../models/User';
import StudentModel from '../models/Student';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { userId, studentData } = body;

    // Connect to MongoDB
    await connectMongoDB();

    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if student already exists
    const existingStudent = await StudentModel.findOne({ user: userId });
    if (existingStudent) {
      return NextResponse.json({ message: 'Student already exists' }, { status: 400 });
    }

    // Create new student document
    const newStudent = await StudentModel.create({
      user: user._id,
      levelOfStudy: studentData.levelOfStudy,
      grade: studentData.grade,
      subjects: studentData.subjects,
      personalInformation: {
        country: studentData.personalInformation.country,
        city: studentData.personalInformation.city,
        streetName: studentData.personalInformation.streetName,
        zipcode: studentData.personalInformation.zipcode,
        institution: studentData.personalInformation.institution,
        age: studentData.personalInformation.age,
      },
      additionalInformation: studentData.additionalInformation,
      availability: studentData.availability,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      phoneNumber: studentData.phoneNumber,
  
    });

  

    return NextResponse.json({ message: 'Student created successfully', student: newStudent }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating student:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
