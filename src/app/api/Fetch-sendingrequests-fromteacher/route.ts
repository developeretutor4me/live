export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../connection/connection';
import UserModel from '../models/User';
import ParentModel from '../models/Parent';
import StudentModel from '../models/Student';
import RequestModel from '../models/Request';
import TeacherModel from '../models/Teacher';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let recipientId;
    if (user.role === 'parent') {
      const parent = await ParentModel.findOne({ user: user._id });
      if (!parent) {
        return NextResponse.json({ error: 'Parent not found' }, { status: 404 });
      }
      recipientId = parent._id;
    } else if (user.role === 'student') {
      const student = await StudentModel.findOne({ user: user._id });
      if (!student) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
      }
      recipientId = student._id;
    } else {
      return NextResponse.json({ error: 'Invalid user role' }, { status: 400 });
    }

    const requests = await RequestModel.find({ recipient: recipientId });

    const requestsWithTeachers = await Promise.all(
      requests.map(async request => {
        const teacher = await TeacherModel.findOne({ user: request.teacher }).populate({
          path: 'user',
          model: 'User',
        });
        return {
          ...request.toObject(),
          teacher,
        };
      })
    );

    return NextResponse.json({ requests: requestsWithTeachers });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
