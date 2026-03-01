// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]/route';
// import Parent from '../models/Parent'; // Import the Parent model

// export async function PUT(req: Request) {
//   try {
//     const { phoneNumber } = await req.json();

//     if (!phoneNumber) {
//       return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
//     }

//     // Get the logged-in user's session
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     // Get user ID from session
//     const userId = session.user.id;

//     // Find the parent document based on the user ID and update the phone number
//     const parent = await Parent.findOneAndUpdate(
//       { user: userId }, 
//       { phoneNumber: phoneNumber },
//       { new: true } // Returns the updated document
//     );

//     if (!parent) {
//       return NextResponse.json({ message: 'Parent record not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Phone number updated successfully', parent }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating phone number:', error);
//     return NextResponse.json({ message: 'Failed to update phone number', error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {authOptions} from '@/app/auth/auth'; 
import Parent from '../models/Parent';
import Student from '../models/Student';
import Teacher from '../models/Teacher';

export async function PUT(req: Request) {
  try {
    const { phoneNumber } = await req.json();
  

    if (!phoneNumber) {
      return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const userRole = session.user.role;


    let updatedUser;
    let query = { user: userId };

    try {
      switch (userRole) {
        case 'parent':
          // For parent model: phoneNumber is a direct field
          updatedUser = await Parent.findOneAndUpdate(
            query,
            { phoneNumber: phoneNumber },
            { new: true }
          );
          break;

        case 'student':
          // For student model: phoneNumber is a direct field
          updatedUser = await Student.findOneAndUpdate(
            query,
            { phoneNumber: phoneNumber },
            { new: true }
          );
          break;

        case 'teacher':
          // For teacher model: phone is nested in contactInformation
          const updateData = {
            $set: {
              'contactInformation.phone': phoneNumber
            }
          };
          
          // First verify the document exists
          const existingTeacher = await Teacher.findOne(query);

          if (!existingTeacher) {
            return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
          }

          updatedUser = await Teacher.findOneAndUpdate(
            query,
            updateData,
            { 
              new: true,
              runValidators: true
            }
          );
          break;

        default:
          return NextResponse.json({ message: 'Invalid user role' }, { status: 400 });
      }


      if (!updatedUser) {
        return NextResponse.json({ message: `${userRole} not found` }, { status: 404 });
      }

      // Verify the update
      let verifiedUser;
      switch (userRole) {
        case 'teacher':
          verifiedUser = await Teacher.findOne(query);
          break;
        case 'parent':
          verifiedUser = await Parent.findOne(query);
          break;
        case 'student':
          verifiedUser = await Student.findOne(query);
          break;
      }

      return NextResponse.json({ 
        message: 'Phone number updated successfully',
        user: updatedUser,
        verifiedUpdate: verifiedUser
      }, { status: 200 });

    } catch (dbError:any) {
      console.error('Database error:', dbError);
      return NextResponse.json({ 
        message: 'Database error', 
        error: dbError.message 
      }, { status: 500 });
    }

  } catch (error:any) {
    console.error('Error updating phone number:', error);
    return NextResponse.json({ 
      message: 'Failed to update phone number', 
      error: error.message 
    }, { status: 500 });
  }
}