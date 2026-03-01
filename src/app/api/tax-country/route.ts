import { NextResponse } from "next/server";
import mongoose from "mongoose";
import TeacherModel from "@/app/api/models/Teacher";
import { connectMongoDB } from "@/app/api/connection/connection";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";

const updateTaxCountrySchema = z.object({
  taxCountry: z.string().min(2).max(100),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: No valid session found." },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const body = await request.json();
    const { taxCountry } = updateTaxCountrySchema.parse(body);

    const updatedTeacher = await TeacherModel.findOneAndUpdate(
      { user: new mongoose.Types.ObjectId(session.user.id) },
      { taxCountry },
      { new: true }
    );

    if (!updatedTeacher) {
      return NextResponse.json(
        { error: "Teacher not found for the provided userId." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Tax country updated successfully",
        taxCountry: updatedTeacher.taxCountry,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    connectMongoDB();
    const teacher = await TeacherModel.findOne(
      { user: new mongoose.Types.ObjectId(session.user.id) },
      { taxCountry: 1, _id: 0 }
    ).lean() as { taxCountry?: string } | null;

    if (!teacher || !teacher.taxCountry) {
      return NextResponse.json({ error: "Teacher not found or tax country missing" }, { status: 404 });
    }

    return NextResponse.json({ taxCountry: teacher.taxCountry });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
