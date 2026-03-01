import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/app/api/models/Ticket";
import {connectMongoDB} from "@/app/api/connection/connection";
import { authOptions } from "@/app/auth/auth";
import { getServerSession } from "next-auth";

export async function POST(req:NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    await connectMongoDB();
    const { ticketId } = await req.json();

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return NextResponse.json({ success: false, error: "Ticket not found" }, { status: 404 });

    ticket.status = "closed";
    await ticket.save();

    return NextResponse.json({ success: true, message: "Ticket closed successfully" }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
