import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/api/models/User';
import Student from '@/app/api/models/Student';
import {connectMongoDB} from '@/app/api/connection/connection'; // Ensure your DB connection utility is correctly configured

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB(); // Connect to the database

    const { email, verificationCode } = await req.json();

    if (!email || !verificationCode) {
      return NextResponse.json(
        { error: 'Email and verification code are required.' },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Check if the verification code matches
    if (user.verification_token !== verificationCode) {
      return NextResponse.json(
        { error: 'Invalid verification code.' },
        { status: 400 }
      );
    }

    //@ts-ignore
    user.verification_token = null;
    await user.save();

    // Find the corresponding student details
    const student = await Student.findOne({ user: user._id })

    if (!student) {
      return NextResponse.json(
        { error: 'Student details not found.' },
        { status: 404 }
      );
    }

    // Return the student details in the response
    return NextResponse.json({
      message: 'User verified successfully.',
      student,
    });
  } catch (error) {
    console.error('Error in verification API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
