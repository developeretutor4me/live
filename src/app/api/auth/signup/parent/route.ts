// signup.ts
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import ParentModel from '../../../models/Parent';
import UserModel from '../../../models/User';
import { sendVerificationEmail } from '../../../utils/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const { email, password, parent, referId } = await req.json();

    const requiredFields = [
      'firstName',
      'lastName',
      'levelOfStudy',
      'grade',
      'availability',
      'phoneNumber',
    ];
    for (const field of requiredFields) {
      if (!parent[field]) {
        return NextResponse.json({ message: `Missing field: ${field}` }, { status: 422 });
      }
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 422 });
    }

    let referredBy = null;
    if (referId) {
      const referringUser = await UserModel.findById(referId);
      if (!referringUser) {
        console.error('Invalid referral ID:', referId);
        return NextResponse.json({ message: 'Invalid referral ID' }, { status: 422 });
      }
      referredBy = referringUser?._id;
    }

    const hashedPassword = await hash(password, 12);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      referredBy,
      role: 'parent',
    });
    const savedUser = await newUser.save();

    if (referredBy) {
      await UserModel.findByIdAndUpdate(referredBy, { $inc: { etokis: 5 } });
    }
    const newParent = new ParentModel({
      user: savedUser._id,
      gradeLevel: parent.gradeLevel,
      grade: parent.grade,
      Institution: parent.Institution,
      levelOfStudy: parent.levelOfStudy,
      age: parent.age,
      subjectChildNeeds: parent.subjectChildNeeds,
      additionalInformation: parent.additionalInformation,
      availability: parent.availability,
      childInformation: parent.childInformation, // Add this if required
      parentPersonalInformation: parent.parentPersonalInformation, // Add this if required
      firstName: parent.firstName,
      lastName: parent.lastName,
      phoneNumber: parent.phoneNumber,
    });
    await newParent.save();

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ message: 'JWT secret is not defined' }, { status: 500 });
    }

    const token = jwt.sign({ userId: savedUser._id, email: savedUser.email }, secret, {
      expiresIn: '1h',
    });

    await sendVerificationEmail(savedUser.email, token).catch(error => {
      console.error('Error sending verification email:', error);
    });

    return NextResponse.json(
      {
        message: 'Parent created. Please check your email to verify your account.',
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Internal server error', error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
