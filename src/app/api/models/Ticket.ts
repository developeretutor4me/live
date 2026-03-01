import { Schema, model, models } from 'mongoose';

const TicketSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: String, required: true },
    additionalComments: { type: String },
    status: {
      type: String,
      enum: ['active', 'awaiting', 'resolved', 'closed', 'escalated'],
      default: 'active',
    },
    assignedTo: { type: String, default: null },
    userNote: { type: String, default: null },
    adminNote: { type: String, default: null },
    isResponded: { type: Boolean, default: false },
    respondedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default models.Ticket || model('Ticket', TicketSchema);
