// models/Request.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IRequest extends Document {
  teacher: Schema.Types.ObjectId;
  recipient: Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
}

const RequestSchema: Schema<IRequest> = new Schema(
  {
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

const RequestModel = mongoose.models.Request || mongoose.model<IRequest>('Request', RequestSchema);

export default RequestModel;
