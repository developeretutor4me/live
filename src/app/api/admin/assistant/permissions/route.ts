export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import AssistantAdmin from '@/app/api/models/AssistantAdmin';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    if (!session.user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const { assistantId, permissions } = await req.json();

    if (!assistantId || !permissions) {
      return NextResponse.json(
        { error: 'Missing required fields: assistantId and permissions' },
        { status: 400 }
      );
    }

    const assistantAdmin = await AssistantAdmin.findById(assistantId);
    if (!assistantAdmin) {
      return NextResponse.json({ error: 'Assistant admin not found' }, { status: 404 });
    }

    const validPermissions = [
      'canManageUsers',
      'canManageTeachers',
      'canManageStudents',
      'canManageParents',
      'canManageBookings',
      'canManagePayments',
      'canManagePricing',
      'canViewAnalytics',
      'canHandleSupport',
      'canManageNotifications',
      'canApproveQualifications',
      'canHandleReports',
    ];

    console.log(assistantAdmin.permissions);

    const updatedPermissions = { ...assistantAdmin.permissions };

    for (const [key, value] of Object.entries(permissions)) {
      if (key === 'customPermissions') {
        if (Array.isArray(value)) {
          updatedPermissions.customPermissions = value;
        }
      } else if (validPermissions.includes(key)) {
        if (typeof value === 'boolean') {
          updatedPermissions[key] = value;
        }
      }
    }

    console.log(updatedPermissions);

    await AssistantAdmin.findByIdAndUpdate(
      assistantId,
      {
        permissions: updatedPermissions,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: 'Assistant admin permissions updated successfully',
        assistantId: assistantId,
        updatedPermissions: updatedPermissions,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    if (!session.user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const assistantId = searchParams.get('assistantId');

    if (!assistantId) {
      return NextResponse.json(
        { error: 'Missing required parameter: assistantId' },
        { status: 400 }
      );
    }

    const assistantAdmin = await AssistantAdmin.findById(assistantId).select(
      'permissions firstName lastName email'
    );
    if (!assistantAdmin) {
      return NextResponse.json({ error: 'Assistant admin not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: 'Assistant admin permissions retrieved successfully',
        assistantId: assistantId,
        assistantInfo: {
          firstName: assistantAdmin.firstName,
          lastName: assistantAdmin.lastName,
          email: assistantAdmin.email,
        },
        permissions: assistantAdmin.permissions,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}
