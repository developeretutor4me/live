export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import AssistantAdmin from '@/app/api/models/AssistantAdmin';
import Admin from '@/app/api/models/Admin';
import { assistantAdminVerificationEmail } from '@/app/api/utils/sendEmail';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    if (!session.user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const { firstName, lastName, email, password, phoneNumber, permissions } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const existingAssistant = await AssistantAdmin.findOne({ email });
    if (existingAssistant) {
      return NextResponse.json(
        { error: 'Assistant with this email already exists' },
        { status: 409 }
      );
    }

    const adminRecord = await Admin.findById('68cbe8a5fcb5f22b683d1880');
    if (!adminRecord) {
      return NextResponse.json({ error: 'Admin record not found' }, { status: 404 });
    }
    const adminId = adminRecord._id;
    const hashedPassword = await hash(password, 12);

    await AssistantAdmin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || '',
      admin: adminId,
      permissions: {
        canManageUsers: permissions?.canManageUsers || false,
        canManageTeachers: permissions?.canManageTeachers || false,
        canManageStudents: permissions?.canManageStudents || false,
        canManageParents: permissions?.canManageParents || false,
        canManageBookings: permissions?.canManageBookings || false,
        canManagePayments: permissions?.canManagePayments || false,
        canManagePricing: permissions?.canManagePricing || false,
        canViewAnalytics: permissions?.canViewAnalytics || false,
        canHandleSupport:
          permissions?.canHandleSupport !== undefined ? permissions.canHandleSupport : true,
        canManageNotifications: permissions?.canManageNotifications || false,
        canApproveQualifications: permissions?.canApproveQualifications || false,
        canHandleReports: permissions?.canHandleReports || false,
        customPermissions: permissions?.customPermissions || [],
      },
      isActive: true,
    });

    await assistantAdminVerificationEmail(email, firstName, lastName);

    return NextResponse.json(
      {
        success: true,
        message: 'Admin assistant created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
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
