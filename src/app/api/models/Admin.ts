import mongoose, { Schema, Document, model } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
}

const AdminSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.models.Admin || model<IAdmin>('Admin', AdminSchema);

export default Admin;
