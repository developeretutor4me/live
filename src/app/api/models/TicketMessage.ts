import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
    senderId: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevents model recompilation
const Message = models.TicketMessage || model('TicketMessage', MessageSchema);
export default Message;
