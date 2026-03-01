import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the ParentStudentRelationship model
export interface IParentStudentRelationship extends Document {
  parent: mongoose.Schema.Types.ObjectId;
  student: mongoose.Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  allowImpersonation: boolean;
  requestedBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for ParentStudentRelationship
const ParentStudentRelationshipSchema: Schema<IParentStudentRelationship> = new Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parent', // Reference to the Parent model
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student', // Reference to the Student model
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'], // Possible statuses for the relationship
      default: 'accepted',
    },
    allowImpersonation: {
      type: Boolean,
      default: true, // Default is false; only set to true if parent is allowed to impersonate
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (who initiated the request)
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the date when the relationship is created
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the date when the relationship is updated
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);



const ParentStudentRelationship = mongoose.models.ParentStudentRelationship || mongoose.model<IParentStudentRelationship>('ParentStudentRelationship', ParentStudentRelationshipSchema);
export default ParentStudentRelationship;