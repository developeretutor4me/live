export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../connection/connection';
import Ticket from '../../models/Ticket';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';
import ParentModel from '../../models/Parent';
import StudentModel from '../../models/Student';
import TeacherModel from '../../models/Teacher';

export async function GET(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    // }

    // Connect to the database
    await connectMongoDB();

    // First, get tickets without populating assignedTo
    const tickets = await Ticket.find().populate({
      path: 'userId',
      select: 'email profilePicture role',
    });

    console.log(tickets);

    const transformedTickets = await Promise.all(
      tickets.map(async (ticket: any) => {
        let firstName: string | null = null;
        let lastName: string | null = null;

        if (ticket?.userId?._id && ticket?.userId?.role === 'parent') {
          const parent = await ParentModel.findOne({ user: ticket?.userId?._id }).select(
            'firstName lastName'
          );

          firstName = parent?.firstName;
          lastName = parent?.lastName;
        }

        if (ticket?.userId?._id && ticket?.userId?.role === 'student') {
          const student = await StudentModel.findOne({ user: ticket?.userId?._id }).select(
            'firstName lastName'
          );

          firstName = student?.firstName;
          lastName = student?.lastName;
        }

        if (ticket?.userId?._id && ticket?.userId?.role === 'teacher') {
          const teacher = await TeacherModel.findOne({ user: ticket?.userId?._id }).select(
            'contactInformation.firstName contactInformation.lastName'
          );

          firstName = teacher?.contactInformation?.firstName;
          lastName = teacher?.contactInformation?.lastName;
        }

        return {
          _id: ticket._id,
          userId: ticket?.userId?._id || null,
          userFirstName: firstName,
          userLastName: lastName,
          userEmail: ticket?.userId?.email || '',
          userRole: ticket?.userId?.role || '',
          userProfilePicture: ticket?.userId?.profilePicture || null,
          topic: ticket.topic,
          additionalComments: ticket.additionalComments,
          status: ticket.status,
          userNote: ticket.userNote,
          adminNote: ticket.adminNote,
          isResponded: ticket.isResponded,
          respondedAt: ticket.respondedAt,
          createdAt: ticket.createdAt,
          updatedAt: ticket.updatedAt,
        };
      })
    );

    return NextResponse.json(
      {
        success: true,
        data: transformedTickets,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching all tickets:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
