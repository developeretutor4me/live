import { NextResponse } from 'next/server';
import { connectMongoDB } from './connection';

export async function GET(request: Request) {
  try {
    await connectMongoDB();
    return NextResponse.json({ message: 'Connected to MongoDB successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Connection failed', error: (error as Error).message },
      { status: 500 }
    );
  }
}
