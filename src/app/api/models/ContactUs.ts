import mongoose, { Schema, Document, model } from 'mongoose';

export interface IContactUs extends Document {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  additionalInformation: string;
  isTicketCreated: boolean;
}

const ContactUsSchema: Schema<IContactUs> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    topic: { type: String, required: true },
    additionalInformation: { type: String, required: true },
    isTicketCreated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ContactUs = mongoose.models.ContactUs || model<IContactUs>('ContactUs', ContactUsSchema);

export default ContactUs;
