import mongoose, { Schema, model, models } from "mongoose";

const PauseTutoringSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    lengthOfPause: {
      type: String, // e.g., "3 months", "1 year"
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    additionalComments: {
      type: String,
      trim: true,
    },
    suggestionsForImprovement: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"], // Enforces valid values
      default: "pending", // Default status is pending
    },
    adminComments: {
      type: String, // Optional comments from the admin when approving/declining
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const PauseTutoringModel =
  models.PauseTutoring || model("PauseTutoring", PauseTutoringSchema);

export default PauseTutoringModel;
