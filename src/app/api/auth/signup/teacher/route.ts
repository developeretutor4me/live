import { hash } from 'bcryptjs';
import UserModel from '../../../models/User';
import TeacherModel from '../../../models/Teacher';
import { NextRequest, NextResponse } from 'next/server';
// import { sendVerificationEmail } from '../../../utils/sendEmail';
// import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, password, contactInformation, education, experience, referId } =
      await req.json();

    const missingFields: string[] = [];

    if (!email) missingFields.push('Enter Email');
    if (!password) missingFields.push('Enter Password');

    // Contact Information validation
    if (!contactInformation) {
      missingFields.push('Add Contact Information');
    } else {
      if (!contactInformation.country) missingFields.push('Select Country');
      if (!contactInformation.firstName) missingFields.push('Enter First Name');
      if (!contactInformation.lastName) missingFields.push('Enter Last Name');
      if (!contactInformation.phone) missingFields.push('Enter Phone Number');
      if (!contactInformation.zipCode) missingFields.push('Enter Zip Code');
      if (!contactInformation.email) missingFields.push('Enter Email');
    }

    // Education validation
    if (!education) {
      missingFields.push('Add Education');
    } else {
      if (!education.college) missingFields.push('Select College/University');
      if (!education.degree) missingFields.push('Enter Degree');
      if (!education.major) missingFields.push('Enter Major');
      if (!education.graduation) missingFields.push('Enter Graduation');
      if (!education.school) missingFields.push('Enter School');
    }

    // Experience validation
    if (!experience) {
      missingFields.push('Add Experience');
    } else {
      if (!experience.hasExperience) missingFields.push('Add Experience');
      if (!experience.tutoringLevel || experience.tutoringLevel.length === 0) {
        missingFields.push('Add Level of Tutoring Experience');
      }
      if (!experience.subjectsTutored || experience.subjectsTutored.length === 0) {
        missingFields.push('Add Subjects Tutored');
      }
      if (!experience.languages || experience.languages.length === 0) {
        missingFields.push('Add Languages you can teach');
      }
      if (!experience.instructionTypes || experience.instructionTypes.length === 0) {
        missingFields.push('Add Instruction Types');
      }
      if (!experience.availableHours) missingFields.push('Add Available Hours');
      if (!experience.hasTeachingExperience) missingFields.push('Add Teaching Experience');
      if (!experience.is18OrAbove) missingFields.push('Add 18 or Above');
    }

    console.log(missingFields);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: `Please fill in the following required fields: ${missingFields.join(', ')}`,
        },
        { status: 422 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 422 });
    }

    let referredBy = null;
    if (referId) {
      const referringUser = await UserModel.findById(referId);
      if (!referringUser) {
        return NextResponse.json({ message: 'Invalid referral ID' }, { status: 422 });
      }
      referredBy = referringUser._id;
    }

    const hashedPassword = await hash(password, 12);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      referredBy,
      role: 'teacher',
    });
    const savedUser = await newUser.save();

    if (referredBy) {
      await UserModel.findByIdAndUpdate(referredBy, { $inc: { etokis: 5 } });
    }

    const newTeacher = new TeacherModel({
      user: savedUser._id,
      contactInformation,
      education,
      experience,
      totalbooking: 0,
    });

    await newTeacher.save();

    // const secret = process.env.JWT_SECRET;
    // if (!secret) {
    //   return NextResponse.json({ message: 'JWT secret is not defined' }, { status: 500 });
    // }

    // const token = jwt.sign({ userId: savedUser._id, email: savedUser.email }, secret, {
    //   expiresIn: '1h',
    // });

    // await sendVerificationEmail(savedUser.email, token).catch(error => {
    //   console.error('Error sending verification email:', error);
    // });

    return NextResponse.json({ message: 'Teacher created.' }, { status: 201 });
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
