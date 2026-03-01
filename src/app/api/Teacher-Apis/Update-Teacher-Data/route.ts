// app/api/teacher/update/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {authOptions} from '@/app/auth/auth'; 
import { connectMongoDB } from '../../connection/connection';
import Teacher from '../../models/Teacher';

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();

    await connectMongoDB();

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          acceptsTrialSession: body.acceptsTrialSession,
          contactInformation: {
            country: body.contactInformation.country,
            countryOfresident: body.contactInformation.countryOfresident,
            firstName: body.contactInformation.firstName,
            lastName: body.contactInformation.lastName,
            zipCode: body.contactInformation.zipCode,
            phone: body.contactInformation.phone,
            streetname: body.contactInformation.streetname,
            shippingAddress: body.contactInformation.shippingAddress,
            city: body.contactInformation.city,
            postcode: body.contactInformation.postcode,
            email: body.contactInformation.email,
          },
          education: {
            college: body.education.college,
            degree: body.education.degree,
            major: body.education.major,
            graduation: body.education.graduation,
            graduationSchool: body.education.graduationSchool,
            graduationCountry: body.education.graduationCountry,
            highestDegree: body.education.highestDegree,
            school: body.education.school,
          },
          DOB: {
            day: body.DOB.day,
            month: body.DOB.month,
            year: body.DOB.year,
          },
          currentJob: body.currentJob,
          timeZone: body.timeZone,
          gender: body.gender,
          VideoIntroduction: body.VideoIntroduction,
          aboutyou: body.aboutyou,
          YourEducation: body.YourEducation,
          experience: {
            experienceWithSpecialNeedsStudent: body.experience.experienceWithSpecialNeedsStudent,
            tutoringExperience: body.experience.tutoringExperience,
            internationalExperience: body.experience.internationalExperience,
            moreaboutProfessionalExperience: body.experience.moreaboutProfessionalExperience,
            hasExperience: body.experience.hasExperience,
            tutoringLevel: body.experience.tutoringLevel,
            subjectsTutored: body.experience.subjectsTutored,
            languages: body.experience.languages,
            instructionTypes: body.experience.instructionTypes,
            availableHours: body.experience.availableHours,
            startDate: body.experience.startDate,
            generalAvailability: body.experience.generalAvailability,
            hasTeachingExperience: body.experience.hasTeachingExperience,
            is18OrAbove: body.experience.is18OrAbove,
          },
          bankDetails: {
            accountholder: body.bankDetails.accountholder,
            IBAN: body.bankDetails.IBAN,
            BIC: body.bankDetails.BIC,
          }
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedTeacher
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating teacher data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// app/api/teacher/route.ts
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const teacherData = await Teacher.findOne({
      user: session.user.id
    }).populate('user', '-password -verification_token');

    if (!teacherData) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: teacherData
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching teacher data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}