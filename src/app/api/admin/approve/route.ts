export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import TeacherModel from "../../models/Teacher";
import {connectMongoDB} from '../../connection/connection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';


export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

    await connectMongoDB();
  
    try {
      const teachers = await TeacherModel.find({}, 'contactInformation.email isApproved').exec();
      if (!teachers.length) {
        return NextResponse.json({ message: 'No teachers found' }, { status: 404 });
      }
      return NextResponse.json({
        message: 'Teachers retrieved successfully',
        teachers,
      }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
  }
  export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }


    
    await connectMongoDB();  
  
    try {
        const { email, isApproved } = await req.json();

        const teacher = await TeacherModel.findOneAndUpdate(
            { 'contactInformation.email': email }, 
            { isApproved },
            { new: true } 
        );
  
        if (!teacher) {
            return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
        }
  
        return NextResponse.json({
            message: 'Teacher status updated successfully',
            teacher: {
                email: teacher.contactInformation.email,
                isApproved: teacher.isApproved, 
            },
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}
