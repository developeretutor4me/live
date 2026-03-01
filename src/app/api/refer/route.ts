export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../connection/connection";
import UserModel from "../models/User";
import { authOptions } from "@/app/auth/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    const user = await UserModel.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate the full referral link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const referralLink = `${baseUrl}/SignupAs?ref=${user._id}`;

    return NextResponse.json({
      referralLink,
    });
  } catch (error) {
    console.error("Error getting referral info:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
