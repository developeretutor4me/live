import mongoose, { Schema, model, models } from "mongoose";

const ResignationSchema = new Schema(
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
    finalDateOfAvailability: {
      type: String,
      required: true,
    },
    additionalComments: {
      type: String,
      trim: true,
    },
    feedbackOnExperience: {
      type: String,
      trim: true,
    },
    additionalDetails: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
    adminComments: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const ResignationModel = models.Resignation || model("Resignation", ResignationSchema);

export default ResignationModel;
