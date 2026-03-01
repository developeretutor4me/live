import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from '../../models/User';
import { sendForgotPasswordEmail } from '../../utils/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log(email);

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 422 });
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: 'User does not exist' }, { status: 422 });
    }

    const secret = process.env.JWT_SECRET || '';
    const token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, secret, {
      expiresIn: '1h',
    });

    await sendForgotPasswordEmail(existingUser.email, token).catch(error => {
      console.error('Error sending forgot password email:', error);
    });

    return NextResponse.json(
      {
        message: 'Reset password email sent to your email address.',
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Internal server error', error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
