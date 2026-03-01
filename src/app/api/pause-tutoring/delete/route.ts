import { NextResponse } from "next/server";
import {connectMongoDB} from "../../connection/connection";
import PauseTutoringModel from "../../models/PauseTutoring";

export async function DELETE(req: Request) {
  try {
    // Parse the request body for the ID
    const { id } = await req.json();

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Request ID is required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Find and delete the request
    const deletedRequest = await PauseTutoringModel.findByIdAndDelete(id);

    if (!deletedRequest) {
      return NextResponse.json(
        { success: false, message: "Pause request not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pause request deleted successfully.",
    });
  } catch (error:any) {
    console.error("Error deleting pause request:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
