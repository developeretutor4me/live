// export const dynamic = 'force-dynamic';
// import { NextResponse } from 'next/server';
// import {connectMongoDB} from '@/app/api/connection/connection'; // Ensure this connects to your MongoDB instance
// import teachermodal from '@/app/api/models/Teacher'; // Ensure this points to your Student schema
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/auth/auth';

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     // Connect to the database
//     await connectMongoDB();

//     // Fetch all students and populate the 'user' field
//     const teacher = await teachermodal.find().populate({
//       path: 'user',
//       select: '-password', // Exclude the password field in the populated user
//     });

//     return NextResponse.json({ success: true, data: teacher }, { status: 200 });
//   } catch (error:any) {
//     console.error('Error fetching students:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/api/connection/connection';
import teacherModel from '@/app/api/models/Teacher';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';

export async function GET(request:NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    await connectMongoDB();
    
    // Get URL search parameters
    const { searchParams } = new URL(request.url);
    
    // Extract filter parameters (all optional)
    const name = searchParams.get('name');
    const subjects = searchParams.getAll('subject'); // Get all subject parameters
    const gender = searchParams.get('gender');
    
    // Extract sorting parameters
    const sortBy = searchParams.get('sortBy'); // Options: 'createdAt', 'nameAsc', 'nameDesc', 'age'
    
    // Extract pagination parameters (for infinite scroll)
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Build the query filter
    const filter: { [key: string]: any } = {};
    
    // Add name filter if provided (search in both first and last name)
    if (name) {
      filter['$or'] = [
        { 'contactInformation.firstName': { $regex: name, $options: 'i' } },
        { 'contactInformation.lastName': { $regex: name, $options: 'i' } }
      ];
    }
    
    // Add subject filter if provided (handle multiple subjects)
    if (subjects && subjects.length > 0) {
      // Create regex patterns for case-insensitive matching
      const subjectPatterns = subjects.map(subject => new RegExp(subject, 'i'));
      
      // Match any teacher that has at least one of the requested subjects
      filter['experience.subjectsTutored'] = { $in: subjectPatterns };
    }
    
    // Add gender filter if provided
    if (gender) {
      filter['gender'] = { $regex: new RegExp(`^${gender}$`, 'i') };
    }
    
    // Prepare the sort configuration
    let sortConfig = {};
    
    if (sortBy === 'createdAt') {
      sortConfig = { createdAt: -1 }; // Sort by joining date (newest first)
    } else if (sortBy === 'nameAsc') {
      sortConfig = { 'contactInformation.firstName': 1 }; // Sort by name (A-Z)
    } else if (sortBy === 'nameDesc') {
      sortConfig = { 'contactInformation.firstName': -1 }; // Sort by name (Z-A)
    } else if (sortBy === 'age') {
      // Sort by age (using DOB)
      sortConfig = { 'DOB.year': 1, 'DOB.month': 1, 'DOB.day': 1 };
    } else {
      // Default sort by created date
      sortConfig = { createdAt: -1 };
    }
    
    // Count total matching documents for pagination info
    const totalCount = await teacherModel.countDocuments(filter);
    
    // Fetch teachers with pagination, filtering and sorting
    const teachers = await teacherModel
      .find(filter)
      .sort(sortConfig)
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'user',
        select: '-password', // Exclude the password field
      });
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page < totalPages;
    
    return NextResponse.json({
      success: true,
      data: teachers,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasMore
      }
    }, { status: 200 });
  } catch (error:any) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}