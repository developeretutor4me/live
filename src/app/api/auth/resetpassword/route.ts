import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token is required' }, { status: 401 });
    }

    const token = authHeader.substring(7);

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && currentTime > decoded.exp) {
      return NextResponse.json({ message: 'Token has expired' }, { status: 401 });
    }

    if (decoded.iat && currentTime - decoded.iat > 3600) {
      return NextResponse.json({ message: 'Token has expired' }, { status: 401 });
    }

    if (!decoded.userId || !decoded.email) {
      return NextResponse.json({ message: 'Invalid token payload' }, { status: 401 });
    }

    const user = await UserModel.findOne({ _id: decoded.userId });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await UserModel.updateOne({ _id: decoded.userId }, { $set: { password: hashedPassword } });

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Reset password error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
