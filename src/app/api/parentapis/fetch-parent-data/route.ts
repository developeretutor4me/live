import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../connection/connection';
import ParentModel from '../../models/Parent';
import StudentModel from '../../models/Student';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role } = session?.user;
    const { userId } = await req.json();

    // Find the parent data by userId
    if (role === 'parent') {
      const parentData = await ParentModel.findOne({ user: userId }).populate('user');
      if (!parentData) {
        return NextResponse.json({ error: 'Parent data not found for this user' }, { status: 404 });
      }
      return NextResponse.json({ parentData });
    } else if (role === 'student') {
      const parentData = await StudentModel.findOne({ user: userId }).populate('user');
      if (!parentData) {
        return NextResponse.json(
          { error: 'Student data not found for this user' },
          { status: 404 }
        );
      }
      return NextResponse.json({ parentData });
    }
  } catch (error) {
    console.error('Error fetching parent data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
