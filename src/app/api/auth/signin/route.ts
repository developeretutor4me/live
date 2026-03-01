import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';
import UserModel from '../../models/User';
import { sendVerificationEmail } from '../../utils/sendEmail';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 422 });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    if (!user.verified) {
      await sendVerificationEmail(user.email, user._id);
      return NextResponse.json(
        { message: 'Account not verified. Verification email sent again.' },
        { status: 403 }
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Signin successful', userId: user._id, role: user.role },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
