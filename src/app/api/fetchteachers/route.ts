export const dynamic = 'force-dynamic';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';
import { connectMongoDB } from '../connection/connection';
import TeacherModel from '../models/Teacher';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    await connectMongoDB();

    const teachers = await TeacherModel.find({ isApproved: true })
      .populate({
        path: 'user',
      })
      .lean();

    return NextResponse.json(teachers, { status: 200 });
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
