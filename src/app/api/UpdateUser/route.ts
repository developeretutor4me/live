import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '../connection/connection';
import User from '../models/User';

export async function PUT(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { userId, userUpdates } = body;

    // Connect to MongoDB
    await connectMongoDB();

    // Validate that the user exists
    const user:any = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Only update the fields provided in the userUpdates object
    const updatedFields:any = Object.keys(userUpdates);
    updatedFields.forEach((field:any) => {
      if (userUpdates[field] !== undefined) {user[field] = userUpdates[field]; // Update specific fields
      }
    });

    await user.save();

    return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
  } catch (error:any) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
