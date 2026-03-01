export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';
import ParentModel from '@/app/api/models/Parent';
import StudentModel from '@/app/api/models/Student';
import { connectMongoDB } from '@/app/api/connection/connection';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { role, id } = session.user;
    let userData;

    if (role === 'parent') {
      userData = await ParentModel.findOne({ user: id }).select('firstName');
    } else if (role === 'student') {
      userData = await StudentModel.findOne({ user: id }).select('firstName');
    } else {
      return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 400 });
    }

    if (!userData) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, firstName: userData.firstName });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
