
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../../connection/connection'; // Database connection
import ParentStudentRelationship from '../../../models/ParentStudentRelation'; // Parent-Student Relationship model
import Parent from '../../../models/Parent'; // Parent model
import Student from '../../../models/Student'; // Student model

export const GET = async (req: NextRequest) => {
  try {
    // Extract the parentUserId from the query parameters
    const url = new URL(req.url);
    const parentUserId = url.searchParams.get('parentUserId'); // Get parentUserId from query params

    // Ensure parentUserId is provided in the query
    if (!parentUserId) {
      return NextResponse.json({ message: 'Parent user ID is required' }, { status: 400 });
    }

    // Connect to the MongoDB database
    await connectMongoDB();

    // Find the parent using the parentUserId
    const parent = await Parent.findOne({ user: parentUserId }).exec(); // Assuming there is a reference to user in the Parent model

    // If parent is not found, return an error
    if (!parent) {
      return NextResponse.json({ message: 'Parent not found for the provided user ID' }, { status: 404 });
    }

    // Fetch all accepted ParentStudentRelationship for the found parent
    const acceptedRequests = await ParentStudentRelationship.find({
      parent: parent._id, // Use the parent ID
      status: 'accepted', // Only fetch requests with status "accepted"
    })
      .populate('student') // Populate student details
      .exec();




      let StudentuserId = ""
      let StudentEmail = ""
      for (const request of acceptedRequests) {
        const studentId = request.student._id; // Access student ID
      
        // Now query the Student model to find the associated User ID
        const student = await Student.findById(studentId).populate('user'); // Assuming 'user' is a reference in the Student model
        if (student && student.user) {
          StudentuserId = student.user._id; // Access the user's ID associated with the student
          StudentEmail = student.user.email
        
        }
      }


    // If no accepted requests found
    if (!acceptedRequests.length) {
      return NextResponse.json({ message: 'No accepted requests found for this parent.' }, { status: 404 });
    }

    // Format the accepted requests with student details
    const formattedRequests = acceptedRequests.map((request) => ({
      requestId: request._id,
      studentId: request.student._id,
      studentName: `${request.student.firstName} ${request.student.lastName}`,
      requestDate: request.createdAt, // Request creation date
      studentUserId:StudentuserId,
      StudentEmail:StudentEmail
    }));

    // Return the accepted requests in the response
    return NextResponse.json({ requests: formattedRequests }, { status: 200 });

  } catch (error) {
    console.error('Error fetching accepted requests:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
