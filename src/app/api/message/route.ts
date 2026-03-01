import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '../connection/connection';
import Message from '../models/Message'; // Path to your Message model
import Conversation from '../models/Conversation'; // Import your Conversation model
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  try {
    const { senderId, recipientId, content, fileUrl, fileType, fileName } = await req.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // Validate request data
    if (!senderId || !recipientId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Check if conversation exists or create a new one
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!conversation) {
      // If no conversation exists between the users, create a new one
      conversation = new Conversation({
        participants: [senderId, recipientId],
      });
      await conversation.save();
    }

    // Create new message linked to the conversation
    const newMessage = new Message({
      senderId,
      recipientId,
      content,
      fileUrl,
      fileType,
      fileName,
      conversationId: conversation._id, // Linking message to conversation
    });

    // Save message to database
    const savedMessage = await newMessage.save();

    // Return the message along with the conversationId
    return NextResponse.json(
      {
        ...savedMessage.toObject(),
        conversationId: conversation._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { message: 'Failed to send message', error: error.message },
      { status: 500 }
    );
  }
}
