import { NextResponse } from 'next/server';
import { sendEmail } from '../../utils/emailsender';
import ContactUs from '../../models/ContactUs';
import Ticket from '../../models/Ticket';
import { connectMongoDB } from '../../connection/connection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session?.user?.id;

    const { firstName, lastName, email, topic, additionalInformation } = await req.json();

    if (!firstName || !email || !topic || !additionalInformation) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await ContactUs.create({
      firstName,
      lastName: lastName || '',
      email,
      topic,
      additionalInformation,
    });

    // Create Ticket (remove)
    await Ticket.create({
      userId: userId,
      topic,
      additionalComments: additionalInformation,
    });

    const emailContent = `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Topic: ${topic}
      Additional Information: ${additionalInformation}
    `;

    await sendEmail({
      subject: 'New Form Submission',
      body: `${emailContent}`,
      recipients: ['Contact@etutor4me.com'],
    });

    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error: any) {
    console.log('Error : ', error);
    return NextResponse.json(
      { message: 'Failed to submit form', error: error.message },
      { status: 500 }
    );
  }
}
