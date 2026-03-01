import { NextResponse } from "next/server";
import {connectMongoDB} from "../connection/connection";
import ResignationModel from "../models/Resignation";

import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const {
      userId,
      teacherId,
      reason,
      finalDateOfAvailability,
      additionalComments,
      feedbackOnExperience,
      additionalDetails,
    } = await req.json();

    // Validate the input fields
    if (
      !userId ||
      !teacherId ||
      !reason ||
      !finalDateOfAvailability ||
      !feedbackOnExperience
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Create the resignation request
    const resignationRequest = new ResignationModel({
      user: new ObjectId(userId),
      teacher: new ObjectId(teacherId),
      reason,
      finalDateOfAvailability,
      additionalComments,
      feedbackOnExperience,
      additionalDetails,
      status: "pending", // Set the default status to "pending"
    });

    // Save the resignation request
    await resignationRequest.save();

    return NextResponse.json({
      success: true,
      message: "Resignation request submitted successfully.",
      data: resignationRequest,
    });
  } catch (error:any) {
    console.error("Error submitting resignation request:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
