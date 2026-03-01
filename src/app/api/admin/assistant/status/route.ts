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

    const { assistantId, isActive } = await req.json();

    if (!assistantId || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing required fields: assistantId and isActive (boolean)' },
        { status: 400 }
      );
    }

    const assistantAdmin = await AssistantAdmin.findById(assistantId);
    if (!assistantAdmin) {
      return NextResponse.json({ error: 'Assistant admin not found' }, { status: 404 });
    }

    await AssistantAdmin.findByIdAndUpdate(
      assistantId,
      {
        isActive: isActive,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: `Assistant admin ${isActive ? 'activated' : 'deactivated'} successfully`,
        assistantId: assistantId,
        isActive: isActive,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}
