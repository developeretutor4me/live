import mongoose, { Schema, Document, model } from 'mongoose';

export interface IAssistantAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  admin: mongoose.Types.ObjectId;
  permissions: {
    canManageUsers: boolean;
    canManageTeachers: boolean;
    canManageStudents: boolean;
    canManageParents: boolean;
    canManageBookings: boolean;
    canManagePayments: boolean;
    canManagePricing: boolean;
    canViewAnalytics: boolean;
    canHandleSupport: boolean;
    canManageNotifications: boolean;
    canApproveQualifications: boolean;
    canHandleReports: boolean;
    customPermissions: string[];
  };
  isActive: boolean;
}

const AssistantAdminSchema: Schema<IAssistantAdmin> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    permissions: {
      canManageUsers: { type: Boolean, default: false },
      canManageTeachers: { type: Boolean, default: false },
      canManageStudents: { type: Boolean, default: false },
      canManageParents: { type: Boolean, default: false },
      canManageBookings: { type: Boolean, default: false },
      canManagePayments: { type: Boolean, default: false },
      canManagePricing: { type: Boolean, default: false },
      canViewAnalytics: { type: Boolean, default: false },
      canHandleSupport: { type: Boolean, default: true },
      canManageNotifications: { type: Boolean, default: false },
      canApproveQualifications: { type: Boolean, default: false },
      canHandleReports: { type: Boolean, default: false },
      customPermissions: [{ type: String }],
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const AssistantAdmin =
  mongoose.models.AssistantAdmin || model<IAssistantAdmin>('AssistantAdmin', AssistantAdminSchema);

export default AssistantAdmin;
