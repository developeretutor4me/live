import { NextResponse } from 'next/server';
import Session from '../../models/Session'; 
import User from '../../models/User'; 
import { connectMongoDB } from '../../connection/connection';

export async function POST(req: Request) {
    const { parentId, teacherId, subject, level, date, sessionLength, startTime } = await req.json();
        if (!parentId || !teacherId || !subject || !level || !date || !sessionLength || !startTime) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 422 });
    }

    await connectMongoDB();
    try {
        const parent = await User.findById(parentId);
        const teacher = await User.findById(teacherId);
        if (!parent || parent.role !== 'parent') {
            return NextResponse.json({ message: 'Invalid parent ID or role' }, { status: 403 });
        }
        if (!teacher || teacher.role !== 'teacher') {
            return NextResponse.json({ message: 'Invalid teacher ID or role' }, { status: 403 });
        }

        const dateTimeString = `${date} ${startTime}`;
        const parsedDateTime = new Date(dateTimeString);
        if (isNaN(parsedDateTime.getTime())) {
            return NextResponse.json({ message: 'Invalid date or time format' }, { status: 422 });
        }

        const currentDate = new Date();
        if (parsedDateTime < currentDate) {
            return NextResponse.json({ message: 'Cannot book sessions in the past' }, { status: 400 });
        }
        const meetingLink = `https://meet.google.com/${subject.toLowerCase()}-${teacherId.substring(0, 6)}-${parsedDateTime.getTime()}`;

        // Create new booking with the generated meeting link
        const newBooking = new Session({
            parentId,
            teacherId,
            subject,
            level,
            date: parsedDateTime,
            sessionLength,
            startTime: parsedDateTime,
            meetingLink,
        });

        await newBooking.save();
        return NextResponse.json({ message: 'Session booked successfully', booking: newBooking }, { status: 201 });
    } catch (error) {
        console.error('Error during session booking:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
