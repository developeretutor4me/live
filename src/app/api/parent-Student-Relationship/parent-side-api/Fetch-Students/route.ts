
import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../../connection/connection';
import Student from '../../../models/Student';
import ParentStudentRelationship from '../../../models/ParentStudentRelation';
import Parent from '../../../models/Parent';

export const GET = async (req: NextRequest, context: { params: any, searchParams: any }) => {
  try {
    const { searchParams } = context;

    const userId= searchParams.get('userId');// Extract the userId from query string

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Connect to the database
    await connectMongoDB();

    // Fetch the parent document using the userId
    const parent = await Parent.findOne({ user: userId });

    if (!parent) {
      return NextResponse.json({ message: 'Parent not found' }, { status: 404 });
    }

    // Get the parentId from the parent document
    const parentId = parent._id;

    // Fetch all students
    const students = await Student.find().populate('user', 'email firstName lastName');

    // Fetch parent-student relationships where the parent is the given parentId
    const parentStudentRelationships = await ParentStudentRelationship.find({ parent: parentId });

    // Get the list of students that this parent has already sent requests to
    const studentsInRelationship = parentStudentRelationships.map((relationship) => relationship.student.toString());

    // Filter out the students who are already in a parent-student relationship
    const filteredStudents = students.filter(
      (student) => !studentsInRelationship.includes(student._id.toString())
    );

    return NextResponse.json({ students: filteredStudents }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
