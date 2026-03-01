// import mongoose, { Schema, Document } from 'mongoose';
// import { IUser } from './User'; // Assuming you have an IUser model for User

// interface IMessage extends Document {
//   senderId: IUser["_id"];
//   recipientId: IUser["_id"];
//   content: string;
//   conversationId: mongoose.Schema.Types.ObjectId;
//   timestamp: Date;
// }

// const messageSchema = new Schema<IMessage>({
//   senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   content: { type: String, required: true },
//   conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// // Check if the model already exists to avoid overwriting it
// const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

// export default Message;
// export type { IMessage };


import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

interface IMessage extends Document {
  senderId: IUser["_id"];
  recipientId: IUser["_id"];
  content: string;
  fileUrl?: string;
  fileType?: string;
  fileName?: string;
  conversationId: mongoose.Schema.Types.ObjectId;
  timestamp: Date;
}

// const messageSchema = new Schema<IMessage | any>({
//   senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   content: { type: String, required: true },
//   fileUrl: { type: String },
//   fileType: { type: String },
//   fileName: { type: String },
//   conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
//   timestamp: { type: Date, default: Date.now },
// });
const messageSchema = new Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String },
  fileUrl: { type: String, default:null },
  fileType: { type: String , default:null},
  fileName: { type: String , default:null},
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },
});

const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

export default Message;
export type { IMessage }; 