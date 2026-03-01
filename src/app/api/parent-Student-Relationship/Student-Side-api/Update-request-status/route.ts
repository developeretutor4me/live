import { NextResponse } from 'next/server';
import {connectMongoDB} from '../../../connection/connection';
import ParentStudentRelationship from '../../../models/ParentStudentRelation';

export const POST = async (req: Request) => {
  try {
    const { relationshipId, status } = await req.json(); // relationshipId and status (accepted/rejected)

    // Connect to the database
    await connectMongoDB();

    // Check if the relationship exists
    const relationship = await ParentStudentRelationship.findById(relationshipId);

    if (!relationship) {
      return NextResponse.json({ message: 'Request not found' }, { status: 404 });
    }

    // Only the student can respond to the request
    if (relationship.status !== 'pending') {
      return NextResponse.json({ message: 'Request already responded to' }, { status: 400 });
    }

    // Update the relationship status based on the response
    if (status === 'accepted') {
      relationship.status = 'accepted';
    } else if (status === 'rejected') {
      relationship.status = 'rejected';
    } else {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    // Save the updated relationship
    await relationship.save();

    return NextResponse.json({ message: 'Request status updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
