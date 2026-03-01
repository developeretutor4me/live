// pages/api/switchAccount.js
import { getServerSession } from "next-auth";
import ParentStudentRelationship from "../../../models/ParentStudentRelation"; // Import your schema
import Student from "../../../models/Student";
import ParentModel from "../../../models/Parent";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/auth/auth";

export async function POST(request:NextRequest) {
  try {
    // Get session info (parent user)
    const session = await getServerSession(authOptions); // Ensure the user is authenticated
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get parent and student IDs from the request body
    const { parentUserId, studentId } = await request.json();

    if (!parentUserId ) {
      return NextResponse.json({ message: "NO Parent id " }, { status: 400 });
    }
    if ( !studentId) {
      return NextResponse.json({ message: "NO Student id " }, { status: 400 });
    }
    const parent = await ParentModel.findOne({user:parentUserId})

    // Check if the parent is linked to the student in the relationship model
    const relationship = await ParentStudentRelationship.findOne({
      parent: parent._id,
      student: studentId,
      status: 'accepted',  // Only allow switching if the relationship is accepted
    });

    if (!relationship) {
      return NextResponse.json({ message: "Parent is not linked to this student or impersonation is not allowed" }, { status: 400 });
    }

    // Find the student’s user ID (assuming this is a reference in the Student model)
    const student = await Student.findById(studentId).populate("user");

    if (!student || !student.user) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    // Return the student’s user ID in the response
    const updatedSessionData = {
      userId: student.user.id, // The student's user ID
      role: "student", // Role for the impersonated account
    };

    // Send this information to the frontend so it can update the session
    return NextResponse.json({ session: updatedSessionData }, { status: 200 });
  } catch (error) {
    console.error("Error in switchAccount API:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
