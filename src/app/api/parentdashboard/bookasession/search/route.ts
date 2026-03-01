    
    
    export const dynamic = 'force-dynamic';

    import { NextResponse, NextRequest } from 'next/server';
    import TeacherModel from '../../../models/Teacher';
    import { connectMongoDB } from '../../../connection/connection';

    export async function GET(req: NextRequest) {
        try {
            await connectMongoDB();
            const { searchParams } = new URL(req.url);
            const filters: any = {};
            const subjects = searchParams.getAll('subjects'); 
            if (subjects.length > 0) {
                filters['experience.subjectsTutored'] = { $in: subjects };
            } const teachers = await TeacherModel.find(filters).populate('user');

            return NextResponse.json(teachers, { status: 200 });
        } catch (error) {
            console.error('Error fetching teachers:', error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
