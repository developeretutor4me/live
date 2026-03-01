import { connectMongoDB } from "@/app/api/connection/connection"; // Replace with your MongoDB connection utility
import User from "@/app/api/models/User"; // Replace with your User model
import { sendEmail } from "@/app/api/utils/emailsender";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { userId, email } = await req.json();

    if (!userId || userId.length !== 6 || !email) {
      return new Response(
        JSON.stringify({ error: "Invalid user ID or email provided." }),
        { status: 400 }
      );
    }

    // Fetch all users with role 'student' and filter by email and ID prefix
    const student = await User.findOne({ email, role: "student" });

    if (!student) {
      return new Response(JSON.stringify({ error: "Email is incorrect." }), {
        status: 404,
      });
    }

    // Check if the first 6 characters of the _id match the userId
    if (!student._id.toString().startsWith(userId)) {
      return new Response(JSON.stringify({ error: "ID is incorrect." }), {
        status: 404,
      });
    }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Update the user's verification token
    student.verification_token = verificationCode;
    await student.save();

    await sendEmail({
      subject: "Verification Code",
      body: `Your verification code is: ${verificationCode}`,
      recipients: [`${email}`],
    });

    return new Response(
      JSON.stringify({ message: "Verification code sent successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in search-student API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
