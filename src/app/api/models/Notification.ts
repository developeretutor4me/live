import mongoose, { Document, Schema } from 'mongoose';
import { notificationsListTypes } from '@/data/constant';

export type NotificationType =
  | 'NEW_MESSAGE'
  | 'SESSION_CANCELLED'
  | 'SESSION_CREATED'
  | 'GENERAL_ALERT';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  type: NotificationType;
  sender: mongoose.Types.ObjectId;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: notificationsListTypes,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
