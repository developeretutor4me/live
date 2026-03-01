// pages/api/requests/[id].ts
import { connectMongoDB } from '../connection/connection';
import RequestModel from '../models/Request';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
    await connectMongoDB();

    // @ts-ignore
    // const { id } = req.params;
    const { id, status } = await req.json();

    if (!['accepted', 'rejected'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    const request = await RequestModel.findById(id);

    if (!request) {
      return NextResponse.json({ message: 'Request not found' }, { status: 404 });
    }

    // Update the status to 'accepted' or 'rejected'
    request.status = status;
    await request.save();

    return NextResponse.json({ message: `Request ${status} successfully.` }, { status: 200 });
  } catch (error) {
    console.error('Error updating request status:', error);
    return NextResponse.json({ message: 'Internal server error', error: (error as Error).message }, { status: 500 });
  }
}
