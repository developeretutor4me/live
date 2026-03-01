import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import UserModel from '../../models/User';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 400 });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return NextResponse.json({ message: 'JWT secret is not defined' }, { status: 500 });
    }

    const decoded = jwt.verify(token, secret) as { userId: string };

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.verified = true;
    await user.save();

    return NextResponse.json({ message: 'Account verified successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Invalid token or internal error', error: error.message },
      { status: 500 }
    );
  }
}
