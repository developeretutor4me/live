import { NextRequest, NextResponse } from 'next/server';
import AssistantAdmin from '../../models/AssistantAdmin';

export async function GET(request: NextRequest) {
  try {
    const assistantAdmins = await AssistantAdmin.find({})
      .populate('admin', 'email')
      .select('-password')
      .lean();

    console.log(assistantAdmins);

    const assistantAdminsWithPasswords = assistantAdmins.map(assistantAdmin => ({
      _id: assistantAdmin._id,
      firstName: assistantAdmin.firstName,
      lastName: assistantAdmin.lastName,
      email: assistantAdmin.email,
      phoneNumber: assistantAdmin.phoneNumber,
      createdBy: assistantAdmin.admin.email,
      permissions: assistantAdmin.permissions,
      isActive: assistantAdmin.isActive,
      createdAt: assistantAdmin.createdAt,
      updatedAt: assistantAdmin.updatedAt,
    }));

    return NextResponse.json(
      {
        data: assistantAdminsWithPasswords,
        count: assistantAdminsWithPasswords.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}
