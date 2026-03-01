export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/api/connection/connection"; // Ensure this connects to your MongoDB instance
import TeacherEtokies from "@/app/api/models/TeacherEtokies"; // Ensure this points to your TeacherEtokies schema
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Check if session and user ID are available
    if (!session) {
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectMongoDB();

    // Fetch all TeacherEtokies related to the logged-in user
    const etokies = await TeacherEtokies.find({ user: session?.user.id }); // Corrected query syntax

    return NextResponse.json({ success: true, data: etokies }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching etokies:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
