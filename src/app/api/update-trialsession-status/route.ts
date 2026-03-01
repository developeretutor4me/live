// app/api/update-password/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import User from '../models/User';
import {authOptions} from '@/app/auth/auth'; 

export async function PATCH(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: 'Status not found' }, { status: 400 });
    }

  

  
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

     currentUser.TrialSessionLeft -=1




    await currentUser.save();

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
  } catch (error:any) {
    console.error('Error updating password:', error);
    return NextResponse.json({ message: 'Failed to update password', error: error.message }, { status: 500 });
  }
}
