import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/api/connection/connection";
import TutorDocument from "@/app/api/models/TutorDocument";
import { authOptions } from "@/app/auth/auth";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const tutorDocs = await await TutorDocument.find({ user: session.user.id });

    return NextResponse.json(
      { success: true, data: tutorDocs },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching tutor documents:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
