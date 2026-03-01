// app/api/redeem/route.ts
import { NextResponse } from 'next/server'; // Next.js server response helper
import { connectMongoDB } from '../connection/connection';
import { getServerSession } from 'next-auth';
import {authOptions} from '@/app/auth/auth';  
import UserModel from '../models/User';


export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Get the request body (assuming it's in JSON format)
    const { etokies } = await request.json();

    const session = await getServerSession(authOptions);

  
const userId = session?.user.id

    // Find the user in the database by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Check if the user has enough etokies
    if (user.etokis < 50) {
      return NextResponse.json({
        success: false,
        message: "You don't have enough etokies to redeem a session.",
      }, { status: 400 });
    }

    // Deduct 50 etokies and add 1 session
    user.etokis -= 50;
    user.sessionsPerMonth += 1;

    // Save the updated user in MongoDB
    await user.save();

    // Respond with the updated values
    return NextResponse.json({
      success: true,
      updatedEtokies: user.etokis,
      updatedSessions: user.sessionsPerMonth,
    });
  } catch (error) {
    console.error('Error processing redemption:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing the redemption.',
    }, { status: 500 });
  }
}
