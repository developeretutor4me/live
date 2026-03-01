export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
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

    const { assistantId, newPassword } = await req.json();

    if (!assistantId || !newPassword) {
      return NextResponse.json(
        { error: 'Missing required fields: assistantId and newPassword' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const assistantAdmin = await AssistantAdmin.findById(assistantId);
    if (!assistantAdmin) {
      return NextResponse.json({ error: 'Assistant admin not found' }, { status: 404 });
    }

    const hashedPassword = await hash(newPassword, 12);
    await AssistantAdmin.findByIdAndUpdate(
      assistantId,
      {
        password: hashedPassword,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: 'Assistant admin password updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}
