import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../connection/connection';
import Admin from '../../models/Admin';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, adminKey } = await req.json();

    const validAdminKey = process.env.ADMIN_CREATE_KEY || 'etutor4me-admin-2024';
    if (adminKey !== validAdminKey) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin creation key' },
        { status: 403 }
      );
    }

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: 'Admin with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const admin = new Admin({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const savedAdmin = await admin.save();
    console.log('savedAdmin : ', savedAdmin);

    return NextResponse.json(
      {
        success: true,
        message: 'Admin account created successfully',
        admin: {
          id: savedAdmin._id,
          name: savedAdmin.name,
          email: savedAdmin.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin creation error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
