import TutorDocument  from '../../models/TutorDocument'; // Adjust the path as necessary
import { connectMongoDB } from '../../connection/connection'; // Adjust the path as necessary
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';


// Define the types for the request body
interface RequestBody {
    status: 'Approved' | 'Declined';
    adminRemarks?: string;
  }
  
  // PUT request handler for approving or declining the tutor document
  export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    let data: RequestBody;
  
    try {
      // Parse the incoming JSON body
      data = await req.json();
  
      // Validate the status
      if (!['Approved', 'Declined'].includes(data.status)) {
        return NextResponse.json(
          { message: 'Invalid status. Use "Approved" or "Declined".' },
          { status: 400 }
        );
      }
  
      // Connect to the database
      await connectMongoDB();
  
      // Validate if the id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return NextResponse.json(
          { message: 'Invalid tutor document ID.' },
          { status: 400 }
        );
      }
  
      // Find the tutor document by ID
      const tutorDocument = await TutorDocument.findById(id);
      
      if (!tutorDocument) {
        return NextResponse.json(
          { message: 'Tutor document not found.' },
          { status: 404 }
        );
      }
  
      // Update the status and admin remarks
      tutorDocument.status = data.status;
      tutorDocument.adminRemarks = data.adminRemarks || '';
  
      // Save the updated document
      await tutorDocument.save();
  
      // Return a success response
      return NextResponse.json(
        {
          message: `Tutor document has been ${data.status === 'Approved' ? 'approved' : 'declined'}.`,
          tutorDocument,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Server error.' }, { status: 500 });
    }
  }