import { Schema, model, models } from "mongoose";

const TutorDocumentSchema = new Schema(
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
    subject: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    files: [
      {
        fileName: {
          type: String,
          required: true,
        },
        fileUrl: {
          type: String,
          required: true,
        },
        fileType: {
          type: String,
        },
        fileSize: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
      default: "Pending",
    },
    adminRemarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const TutorDocument =
  models.TutorDocument || model("TutorDocument", TutorDocumentSchema);

export default TutorDocument;
