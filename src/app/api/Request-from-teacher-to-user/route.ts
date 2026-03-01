// pages/api/requests.ts
import { connectMongoDB } from '../connection/connection';
import RequestModel from '../models/Request';
import TeacherModel from '../models/Teacher';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { teacherId, recipientId } = await req.json();

    // Check if a request already exists between this teacher and recipient
    const existingRequest = await RequestModel.findOne({ teacher: teacherId, recipient: recipientId });
    if (existingRequest) {
      return NextResponse.json({ message: 'A request has already been sent.' }, { status: 400 });
    }

    // Create the new request
    const newRequest = new RequestModel({
      teacher: teacherId,
      recipient: recipientId,
      status: 'pending',
    });

    await newRequest.save();
    return NextResponse.json({ message: 'Request sent successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Error sending request:', error);
    return NextResponse.json({ message: 'Internal server error', error: (error as Error).message }, { status: 500 });
  }
}
