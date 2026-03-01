export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import {connectMongoDB} from '@/app/api/connection/connection'; // Ensure this connects to your MongoDB instance
import PauseTutoringModel from '@/app/api/models/PauseTutoring'; // Ensure this points to your Student schema
import UserModel from '@/app/api/models/User'; // Ensure this points to your User schema
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // Connect to the database
    await connectMongoDB();

    // Fetch all students and populate the 'user' field
    const request = await PauseTutoringModel.find().populate({
      path: 'teacher',
      select:'contactInformation'
    
    }).populate(
        'user'
    );

    return NextResponse.json({ success: true, data: request }, { status: 200 });
  } catch (error:any) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
