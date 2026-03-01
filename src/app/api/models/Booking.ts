// BookingModel.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
import TeacherModel from '../models/Teacher';

export interface IZoomMeeting {
  uuid: string;
  id: number;
  host_id: string;
  host_email: string;
  topic: string;
  type: number;
  status: string;
  start_time: string;
  duration: number;
  timezone: string;
  created_at: string;
  start_url: string;
  join_url: string;
  password: string;
  h323_password: string;
  pstn_password: string;
  encrypted_password: string;
  settings: {
    host_video: boolean;
    participant_video: boolean;
    cn_meeting: boolean;
    in_meeting: boolean;
    join_before_host: boolean;
    mute_upon_entry: boolean;
    watermark: boolean;
    use_pmi: boolean;
    approval_type: number;
    audio: string;
    auto_recording: string;
    enforce_login: boolean;
    enforce_login_domains: string;
    alternative_hosts: string;
    close_registration: boolean;
    waiting_room: boolean;
    global_dial_in_countries: string[];
    global_dial_in_numbers: Array<{
      country: string;
      number: string;
      type: string;
    }>;
    contact_name: string;
    contact_email: string;
    registrants_email_notification: boolean;
    meeting_authentication: boolean;
    authentication_option: string;
    authentication_domains: string;
    authentication_name: string;
  };
  pre_schedule: boolean;
}

const ZoomMeetingSettingsSchema = new Schema(
  {
    host_video: Boolean,
    participant_video: Boolean,
    cn_meeting: Boolean,
    in_meeting: Boolean,
    join_before_host: Boolean,
    mute_upon_entry: Boolean,
    watermark: Boolean,
    use_pmi: Boolean,
    approval_type: Number,
    audio: String,
    auto_recording: String,
    enforce_login: Boolean,
    enforce_login_domains: String,
    alternative_hosts: String,
    close_registration: Boolean,
    waiting_room: Boolean,
    global_dial_in_countries: [String],
    global_dial_in_numbers: [
      {
        country: String,
        number: String,
        type: String,
      },
    ],
    contact_name: String,
    contact_email: String,
    registrants_email_notification: Boolean,
    meeting_authentication: Boolean,
    authentication_option: String,
    authentication_domains: String,
    authentication_name: String,
  },
  { _id: false }
);

const ZoomMeetingSchema = new Schema(
  {
    uuid: String,
    id: Number,
    host_id: String,
    host_email: String,
    topic: String,
    type: Number,
    status: String,
    start_time: String,
    duration: Number,
    timezone: String,
    created_at: String,
    start_url: String,
    join_url: String,
    password: String,
    h323_password: String,
    pstn_password: String,
    encrypted_password: String,
    settings: ZoomMeetingSettingsSchema,
    pre_schedule: Boolean,
  },
  { _id: false }
);

export interface IBooking extends Document {
  student: mongoose.Types.ObjectId;
  teacher: mongoose.Types.ObjectId;
  subjects: string[];
  level: string;
  date: Date;
  time: string;
  timeZone: string | null | undefined;
  status: 'pending' | 'accepted' | 'rejected';
  meetingCompleted: boolean;
  IsTrialSession: boolean;
  isGroupBooking: boolean;
  duration: string;
  startLink: string;
  joinLink: string;
  StudentNote: string;
  zoomMeetingData: {
    success: boolean;
    meeting: IZoomMeeting;
    additional_data?: any; // For any additional fields that might come in the response
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    subjects: {
      type: [String],
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    timeZone: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    meetingCompleted: {
      type: Boolean,
      default: false,
    },
    IsTrialSession: {
      type: Boolean,
      default: false,
    },
    isGroupBooking: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: String,
      default: '60 min',
    },
    startLink: {
      type: String,
      default: '',
    },
    joinLink: {
      type: String,
      default: '',
    },
    StudentNote: { type: String },
    zoomMeetingData: {
      type: new Schema(
        {
          success: Boolean,
          meeting: ZoomMeetingSchema,
          additional_data: Schema.Types.Mixed,
        },
        { _id: false }
      ),
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default BookingModel;
