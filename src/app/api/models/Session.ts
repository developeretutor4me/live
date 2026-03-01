import mongoose, { Document, Schema } from 'mongoose';
export interface ISession extends Document {
  parentId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;  
  subject: string;
  level: string;
  date: Date;
  sessionLength: number; 
  startTime: Date;
  meetingLink: string;
  status: 'pending' | 'accepted';  
}

// Create the SessionSchema
const SessionSchema: Schema = new Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  sessionLength: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  meetingLink: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted'],
    default: 'pending'
  },
}, {
  timestamps: true,
});
const SessionModel = mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);

export default SessionModel;
