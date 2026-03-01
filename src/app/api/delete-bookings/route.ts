// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "../models/Booking"; // Adjust path to your Booking model
import { connectMongoDB } from "../connection/connection";
import { authOptions } from "@/app/auth/auth";
import { getServerSession } from "next-auth";

export async function DELETE(request: NextRequest) {
  try {
    const { studentId, teacherId } = await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }


    
    await connectMongoDB();

    // Find and delete the booking
    const deletedBooking = await Booking.deleteMany({
      student: studentId,
      teacher: teacherId,
      meetingCompleted:false
    });

    if (!deletedBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
