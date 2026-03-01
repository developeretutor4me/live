import mongoose, { Document, Schema, Model } from 'mongoose';
export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  role: string;
  isAdmin: boolean;
  verified: boolean;
  verification_token?: string;
  referralCode: string;
  etokis: number;
  referredBy?: string;
  profilePicture?: string;
  trialSessions: any;
  hasCompletedFirstSession: boolean;
  stripeSubscriptionId: string;
  planType: any;
  tutorLevel: string;
  durationMonths: string;
  sessionsPerMonth: number;
  subscriptionDateStart: string;
  subscriptionDateEnd: string;
  stripeMonthlyPrice: number;
  TrialSessionLeft: number;
  subscriptionIsActive: boolean;
}

function generateReferralCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const codeLength = 8;
  let result = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  // Add timestamp to ensure uniqueness
  const timestamp = Date.now().toString(36).slice(-4);
  return `${result}${timestamp}`;
}

const PlanTypeSchema = new Schema(
  {
    type: { type: String, default: 'no membership' },
  },
  { timestamps: true }
);

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    role: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    verification_token: { type: String, default: null },
    etokis: { type: Number, default: 0 },
    referralCode: { type: String, unique: true, default: null },
    referredBy: { type: String, default: null },
    profilePicture: {
      type: String,
      default:
        'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg',
    },
    trialSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    hasCompletedFirstSession: { type: Boolean, default: false },
    stripeSubscriptionId: { type: String },
    planType: { type: PlanTypeSchema, default: () => ({}) },
    tutorLevel: { type: String },
    durationMonths: { type: String },
    sessionsPerMonth: { type: Number, default: 0 },
    subscriptionDateStart: { type: String },
    subscriptionDateEnd: { type: String },
    stripeMonthlyPrice: { type: Number, default: 0 },
    TrialSessionLeft: { type: Number, default: 2 },
    subscriptionIsActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.referralCode) {
    this.referralCode = generateReferralCode();
  }
  next();
});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
