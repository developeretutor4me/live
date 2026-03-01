import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '../connection/connection';
import User from '../models/User';
import ParentModel from '../models/Parent';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { userId, parentData } = body;



    // Connect to MongoDB
    await connectMongoDB();

    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Create the parent document and spread parent-specific data
    const newParent = await ParentModel.create({
      user: user._id,
      gradeLevel: parentData.parent.gradeLevel,
      grade: parentData.parent.grade,
      Institution: parentData.parent.Institution,
      levelOfStudy: parentData.parent.levelOfStudy,
      age: parentData.parent.age,
      subjectChildNeeds: parentData.parent.subjectChildNeeds,
      additionalInformation: parentData.parent.additionalInformation,
      availability: parentData.parent.availability,
      childInformation: parentData.parent.childInformation,
      parentPersonalInformation: parentData.parent.parentPersonalInformation,
      firstName: parentData.firstName ||parentData.parent.firstName ,
      lastName: parentData.lastName ||parentData.parent.lastName,
      phoneNumber: parentData.parent.phoneNumber,
    });
  

    return NextResponse.json({ message: 'Parent created successfully' }, { status: 200 });
  } catch (error:any) {
    console.error('Error creating parent:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
