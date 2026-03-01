import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User'; // Assuming you have an IUser model for User

interface IConversation extends Document {
  participants: IUser['_id'][]; // Array of user IDs (participants in the conversation)
  lastMessage: string; // Content of the last message in the conversation
  timestamp: Date; // Timestamp of the last message or creation time
}

const conversationSchema = new Schema<IConversation | any>({
  participants: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
  lastMessage: { type: String, default: 'intial message' },
  timestamp: { type: Date, default: Date.now },
});

// Check if the model already exists to avoid overwriting it
const Conversation =
  mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', conversationSchema);

export default Conversation;
