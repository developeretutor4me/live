import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../connection/connection';
import Admin from '../../models/Admin';
import { compare } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Authentication successful',
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: 'admin',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin authentication error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// GET method to check admin existence (for setup purposes)
export async function GET() {
  try {
    await connectMongoDB();

    // Check if any admin exists
    const adminCount = await Admin.countDocuments();

    return NextResponse.json(
      {
        success: true,
        hasAdmins: adminCount > 0,
        count: adminCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
