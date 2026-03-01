// app/api/update-password/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import User from '../models/User';
import {authOptions} from '@/app/auth/auth'; 

export async function PUT(req: Request) {
  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: 'Current and new password are required' }, { status: 400 });
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

    // Check if the provided current password matches the user's existing password
    const isPasswordValid = await bcrypt.compare(currentPassword, currentUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid current password' }, { status: 401 });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    currentUser.password = hashedNewPassword;
    await currentUser.save();

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
  } catch (error:any) {
    console.error('Error updating password:', error);
    return NextResponse.json({ message: 'Failed to update password', error: error.message }, { status: 500 });
  }
}
