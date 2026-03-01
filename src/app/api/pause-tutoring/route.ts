import { NextResponse } from "next/server";
import {connectMongoDB} from "../connection/connection";
import PauseTutoringModel from "../models/PauseTutoring";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const {
      userId, // ID of the user making the request
      teacherId, // ID of the teacher whose sessions are being paused
      reason, // Reason for pausing
      lengthOfPause, // Duration of the pause (e.g., "3 months", "1 year")
      returnDate, // Date when the user plans to return
      additionalComments, // Optional comments
      suggestionsForImprovement, // Optional suggestions
    } = await req.json();

    // Validate required fields
    if (!userId || !teacherId || !reason || !lengthOfPause || !returnDate) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Create a new pause request
    const pauseRequest = new PauseTutoringModel({
      user: userId,
      teacher: teacherId,
      reason,
      lengthOfPause,
      returnDate: new Date(returnDate),
      additionalComments: additionalComments || "",
      suggestionsForImprovement: suggestionsForImprovement || "",
    });

    // Save the request to the database
    await pauseRequest.save();

    return NextResponse.json({
      success: true,
      data: pauseRequest,
      message: "Pause request submitted successfully.",
    });
  } catch (error:any) {
    console.error("Error creating pause request:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
