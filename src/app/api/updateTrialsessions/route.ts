import { NextResponse } from 'next/server';
import { connectMongoDB } from '../connection/connection';
import UserModel from '../models/User';

export async function PATCH(req: Request) {
  try {
    await connectMongoDB();
    console.log('Connected to MongoDB');

    const body = await req.json();
    const { userId, trialSessionsLeft } = body;

    console.log(userId, trialSessionsLeft, 'Received Data');

    if (!userId || trialSessionsLeft === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { TrialSessionLeft: trialSessionsLeft }, // Ensure field name matches schema
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Trial sessions updated', user }, { status: 200 });
  } catch (error) {
    console.error('Error updating trial sessions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
