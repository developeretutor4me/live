// app/api/users/route.ts
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../connection/connection'; // Adjust the import path as necessary
import UserModel from '../models/User'; // Import the User model
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    await connectMongoDB(); // Ensure the database is connected

    // Parse the request body to get userId
    const { userId } = await req.json();

    // Validate userId presence
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch the user by userId from the database
    const user = await UserModel.findById(userId);

    // Check if the user was found
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
