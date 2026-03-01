import { NextRequest, NextResponse } from 'next/server';
import {connectMongoDB} from '../../connection/connection'; // MongoDB connection function
import ParentModel from '../../models/Parent';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { userId, updatedParentData } = await req.json();

    // Ensure updatedParentData is not empty
    if (Object.keys(updatedParentData).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // Update the parent data by userId
    const updatedParent = await ParentModel.findOneAndUpdate(
      { user: userId },
      { $set: updatedParentData },
      { new: true } // Return the updated document
    );

    if (!updatedParent) {
      return NextResponse.json({ error: 'Parent data not found for this user' }, { status: 404 });
    }

    return NextResponse.json({ updatedParent });
  } catch (error) {
    console.error("Error updating parent data:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
