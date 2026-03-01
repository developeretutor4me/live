export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";
import {connectMongoDB} from "@/app/api/connection/connection";
import UserModel from "@/app/api/models/User";

export async function GET() {
  try {
    // Connect to database
    await connectMongoDB();

    // Get session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user profile picture
    const user = await UserModel.findOne({ email: session.user.email }).select("profilePicture");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ profilePicture: user.profilePicture });
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
