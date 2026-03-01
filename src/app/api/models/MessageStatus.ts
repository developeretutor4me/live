import { Schema, model, Document } from "mongoose";
// import { IUser } from "./User";
import { IMessage } from "./Message";

interface IMessageStatus extends Document {
  messageId: IMessage["_id"];
  userId: any
  status: string;
  updatedAt: Date;
}

const MessageStatusSchema = new Schema<IMessageStatus>(
  {
    messageId: { type: Schema.Types.ObjectId, ref: "Message", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const MessageStatus = model<IMessageStatus>("MessageStatus", MessageStatusSchema);
export { MessageStatus };
    export type { IMessageStatus };
