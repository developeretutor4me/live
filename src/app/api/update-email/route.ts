// app/api/update-email/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import User from '../models/User'; // Import the User model
import {authOptions} from '@/app/auth/auth'; 

export async function PUT(req: Request) {
  try {
    const { newEmail, password } = await req.json();

    if (!newEmail || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Get the logged-in user's session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Find the user by their ID from the session
    const userId = session.user.id;
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if the provided password matches the user's current password
    const isPasswordValid = await bcrypt.compare(password, currentUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Check if the new email is already in use by another user
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return NextResponse.json({ message: 'Email is already in use' }, { status: 409 }); // 409 Conflict
    }

    // Update the user's email in the database
    currentUser.email = newEmail;
    await currentUser.save();

    return NextResponse.json({ message: 'Email updated successfully' }, { status: 200 });
  } catch (error:any) {
    console.error('Error updating email:', error);
    return NextResponse.json({ message: 'Failed to update email', error: error.message }, { status: 500 });
  }
}
