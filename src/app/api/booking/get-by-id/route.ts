import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';
import BookingModel from '@/app/api/models/Booking';
import { connectMongoDB } from '../../connection/connection';

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const studentId = session?.user.id;

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('id');

    if (!bookingId) {
      return NextResponse.json(
        { success: false, error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const booking = await BookingModel.findOne({
      _id: bookingId,
      student: studentId,
    }).exec();

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking not found or you do not have access to this booking',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
