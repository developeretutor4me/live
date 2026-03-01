
export const dynamic = 'force-dynamic';

import { NextResponse, NextRequest } from 'next/server';
import TeacherModel from '../../../models/Teacher';
import { connectMongoDB } from '../../../connection/connection';
import { SortOrder } from 'mongoose';

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        const { searchParams } = new URL(req.url);
        const sortBy = searchParams.get('sortBy');
        const order = searchParams.get('order') || 'asc';
        const sortDirection: SortOrder = order === 'asc' ? 1 : -1;
        const sortOptions: Record<string, SortOrder> = {};

     

        if (sortBy === 'startDate') {
            sortOptions['createdAt'] = sortDirection;
        } else if (sortBy === 'name') {
            sortOptions['contactInformation.firstName'] = sortDirection;
        }

        if (Object.keys(sortOptions).length > 0) {
            const teachers = await TeacherModel.find().sort(sortOptions).populate('user');
            return NextResponse.json(teachers, { status: 200 });
        } else {
            return NextResponse.json({ message: 'No sorting criteria provided' }, { status: 400 });
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching teachers:', error.message);
            return NextResponse.json({ message: error.message || 'Internal server error' }, { status: 500 });
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
    
}
