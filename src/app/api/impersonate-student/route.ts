import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';
import Student from '../models/Student';
import Parent from '../models/Parent';
import { connectMongoDB } from '../connection/connection';

export const POST = async (req: Request) => {
  try {
    const { parentUserId, studentUserId } = await req.json();

    
    if (!parentUserId || !studentUserId) {
      return NextResponse.json(
        { message: 'Parent and Student User IDs are required' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const parent = await Parent.findOne({ user: parentUserId });
    const student = await Student.findOne({ _id: studentUserId });

    if (!parent) {
      return NextResponse.json({ message: 'Parent not found' }, { status: 404 });
    }

    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    // Modify the JWT token to impersonate the student
    return NextResponse.json(
      {
        message: 'Impersonation successful',
        impersonatedUser: {
          id: student.user,
          role: 'student',
          name: student.name,
        },
      },
      { status: 200 }
    );
  } catch (error:any) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
};
