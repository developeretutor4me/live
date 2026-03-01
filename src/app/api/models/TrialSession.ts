import mongoose, { Document, Schema } from 'mongoose';

export interface ITrialSession extends Document {
  user: mongoose.Types.ObjectId;
  teacher: mongoose.Types.ObjectId;
  date: Date;
}

const TrialSessionSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { type: Date, default: Date.now }
});

const TrialSessionModel = mongoose.models.TrialSession || mongoose.model<ITrialSession>('TrialSession', TrialSessionSchema);
export default TrialSessionModel;
