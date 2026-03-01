import mongoose, { Schema } from 'mongoose';

interface IGroupBooking extends Document {
  bookingsIds: string[];
}

const GroupBookingSchema = new Schema(
  {
    bookingsIds: [String],
  },
  { timestamps: true }
);

const GroupBookingModel =
  mongoose.models.GroupBooking || mongoose.model<IGroupBooking>('GroupBooking', GroupBookingSchema);

export default GroupBookingModel;
