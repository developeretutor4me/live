

import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../../connection/connection';
import Student from '../../../models/Student';
import ParentStudentRelationship from '../../../models/ParentStudentRelation';

export const GET =async (req: NextRequest, context: { params: any, searchParams: any }) => {
  try {
    const { searchParams } = context;
    // Get the student userId from the query params
  
    const studentUserId = searchParams.get('studentUserId'); // Extract student userId from query params

    if (!studentUserId) {
      return NextResponse.json({ message: 'Student User ID is required' }, { status: 400 });
    }

    // Connect to the database
    await connectMongoDB();

    // Find the student document using the studentUserId
    const student = await Student.findOne({ user: studentUserId });

    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    // Get the studentId from the student document
    const studentId = student._id;

    // Fetch all ParentStudentRelationship where the student is the given studentId
    const requests = await ParentStudentRelationship.find({ student: studentId }).populate('parent');

    // If no requests found
    if (!requests.length) {
      return NextResponse.json({ message: 'No requests found' }, { status: 404 });
    }

    // Extract parent details and status for each request
    const detailedRequests = requests.map((request) => {
      const parent = request.parent;
      return {
        requestId: request._id,
        parentId: parent._id,
        parentName: `${parent.firstName} ${parent.lastName}`,
        parentEmail: parent.email,
        requestDate: request.createdAt, // Add the date when the request was sent
        status: request.status, // Include the status field from ParentStudentRelationship
      };
    });

    return NextResponse.json({ requests: detailedRequests }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
