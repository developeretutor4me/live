import { NextResponse } from "next/server";
import {connectMongoDB} from "../../connection/connection";
import PauseTutoringModel from "../../models/PauseTutoring";

export async function PATCH(req: Request) {
  try {
    // Parse the request body
    const { id, status, adminComments } = await req.json();

    // Validate input
    if (!id || !["approved", "declined"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid input. Ensure id and valid status are provided." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Find and update the request
    const updatedRequest = await PauseTutoringModel.findByIdAndUpdate(
      id,
      {
        status,
        adminComments: adminComments || "",
      },
      { new: true } // Return the updated document
    );

    if (!updatedRequest) {
      return NextResponse.json(
        { success: false, message: "Pause request not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedRequest,
      message: "Pause request status updated successfully.",
    });
  } catch (error:any) {
    console.error("Error updating pause request status:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
