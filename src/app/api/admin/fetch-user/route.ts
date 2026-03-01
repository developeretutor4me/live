export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import {connectMongoDB} from '@/app/api/connection/connection'; 
import UserModel from '@/app/api/models/User'; 
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
    const users = await UserModel.find().select('-password')

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error:any) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
