import mongoose, { Document, Schema } from 'mongoose';

export interface ITeacher extends Document {
  level: number;
  user: mongoose.Types.ObjectId;
  contactInformation: {
    country: string;
    firstName: string;
    lastName: string;
    zipCode: string;
    email: string;
  };
  education: {
    college: string;
    degree: string;
    major: string;
    graduation: Date;
    school?: string;
  };
  experience: {
    hasExperience: boolean;
    tutoringLevel: string[];
    subjectsTutored: string[];
    languages: string[];
    instructionTypes: string[];
    availableHours: string;
    startDate: Date;
    generalAvailability: {
      day: string;
      time: string;
    }[];
    EarnedThisMonth: number;
    hasTeachingExperience: boolean;
    taxCountry: string;
    is18OrAbove: boolean;
  };
  isApproved: boolean;
}
const TeacherSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    acceptsTrialSession: { type: Boolean, default: true },
    contactInformation: {
      country: { type: String },
      countryOfresident: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      zipCode: { type: String },
      phone: { type: String },
      streetname: { type: String },
      shippingAddress: { type: String },
      city: { type: String },
      postcode: { type: String },
      email: { type: String },
    },
    education: {
      college: { type: String },
      degree: { type: String },
      major: { type: String },
      graduation: { type: Date },
      graduationSchool: { type: String },
      graduationCountry: { type: String },
      highestDegree: { type: String },
      school: { type: String },
    },
    DOB: {
      day: { type: String },
      month: { type: String },
      year: { type: String },
    },

    currentJob: { type: String },
    timeZone: { type: String },
    gender: { type: String },
    VideoIntroduction: { type: String },
    aboutyou: { type: String },
    YourEducation: { type: String },

    experience: {
      experienceWithSpecialNeedsStudent: { type: [String] },
      tutoringExperience: { type: String },
      internationalExperience: { type: String },
      moreaboutProfessionalExperience: { type: String },
      hasExperience: { type: Boolean },
      tutoringLevel: { type: [String] },
      subjectsTutored: { type: [String] },
      languages: { type: [String] },
      instructionTypes: { type: [String] },
      availableHours: { type: String },
      startDate: { type: Date },
      generalAvailability: { type: Map, of: [String] },
      hasTeachingExperience: { type: Boolean },
      is18OrAbove: { type: Boolean },
    },
    bankDetails: {
      accountholder: { type: String },
      IBAN: { type: String },
      BIC: { type: String },
    },
    currentMonthRegularSession: { type: Number, default: 0 },
    currentMonthGroupSession: { type: Number, default: 0 },
    TotalGroupSession: { type: Number, default: 0 },
    TotalRegularSession: { type: Number, default: 0 },
    totalbooking: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badge: {
      type: String,
      default:
        'https://cdn4.vectorstock.com/i/1000x1000/85/48/emblem-badge-ribbon-vector-14398548.jpg',
    },
    taxCountry: {
      type: String,
    },
    EarnedThisMonth: { type: Number, default: 0 },
    EarnedLastMonth: { type: Number, default: 0 },
    TotalEarning: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const TeacherModel = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);

export default TeacherModel;
