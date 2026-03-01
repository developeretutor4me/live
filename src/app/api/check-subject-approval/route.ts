import { NextResponse } from "next/server";
import TutorDocument from "@/app/api/models/TutorDocument";
import { connectMongoDB } from "@/app/api/connection/connection";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";
import TeacherModel from "../models/Teacher";
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { subject } = await request.json();

    const teacher = await TeacherModel.findOne({ user: session.user.id });
    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    const teacherId = teacher._id.toString();



    console.log("Teacher ID:", teacherId);
    console.log("Subject:", subject);

    if (!teacherId ) {
      return NextResponse.json(
        { error: "Invalid teacher ID" },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Check if the subject is approved for this teacher
    const tutorDoc = await TutorDocument.findOne({
      teacher: teacherId,
      subject: subject,
      status: "Approved",
    });

    if (tutorDoc) {
      return NextResponse.json(
        { message: `The subject "${subject}" is approved.` },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: `The subject "${subject}" is not approved.` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
