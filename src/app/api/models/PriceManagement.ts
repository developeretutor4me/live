import mongoose from "mongoose";

export interface IMembershipPlan extends Document {
  planType: "standard" | "premium" | "payasyougo" | "bundles";
  tutorLevel: "Junior" | "Senior" | "Expert";
  priceId: string;
  priceAmount: number;
  currency: string;
  description: string;
  bundles_session: string;
  discount: {
    type: "percentage" | "fixed";
    value: number;
    couponId: string;
  };
  createdAt: Date;
}

const MembershipPlanSchema = new mongoose.Schema(
  {
    planType: {
      type: String,
      enum: ["standard", "premium", "payasyougo", "bundles"],
      required: true,
    },
    tutorLevel: {
      type: String,
      enum: ["Junior", "Senior", "Expert"], // Tutor levels
      required: true,
    },
    month: {
      type: String,
    },
    bundles_session: {
      type: String,
      default:null
    },
    priceId: {
      type: String, // Stripe Price ID
      required: true,
    },
    description: {
      type: String,
    },
    priceAmount: {
      type: Number, // Price in cents (e.g., 2000 = $20.00)
      required: true,
    },
    currency: {
      type: String,
      default: "usd",
    },
    discount: {
      type: {
        type: String,
        enum: ["percentage", "fixed"], // Discount type: Percentage or Fixed Amount
      },
      value: Number, // Discount value (e.g., 10% or $5)
      couponId: String, // Stripe Coupon ID (optional)
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const MembershipPlan =
  mongoose.models.MembershipPlan ||
  mongoose.model<IMembershipPlan>("MembershipPlan", MembershipPlanSchema);
export default MembershipPlan;


