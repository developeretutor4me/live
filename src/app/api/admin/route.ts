export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { connectMongoDB } from '../connection/connection';
import Admin from '../models/Admin';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';
import { hash } from 'bcryptjs';

export async function POST() {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    // }

    const hashedPassword = await hash('12345abc', 12);
    await connectMongoDB();
    const admin = new Admin({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: hashedPassword,
    });

    const savedAdmin = await admin.save();

    return NextResponse.json({ success: true, data: savedAdmin }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
