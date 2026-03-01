import mongoose, { Document, Schema } from 'mongoose';
export interface IStudent extends Document {
  user: mongoose.Types.ObjectId; 
  levelOfStudy: string;
  grade: string;
  subjects: string[]; 
  personalInformation: {
    country: string;
    city: string;
    streetName: string;
    zipcode: string;
    institution: string;
    age: number;
  };
  additionalInformation: string;
  availability: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}






const StudentSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  levelOfStudy: { type: String },
  grade: { type: String },
  subjects: { type: [String] },
  personalInformation: {
    country: { type: String },
    city: { type: String },
    streetName: { type: String },
    zipcode: { type: String },
    institution: { type: String },
    age: { type: Number }
  },
  additionalInformation: { type: String },
  availability: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },

});








const StudentModel = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
export default StudentModel;
