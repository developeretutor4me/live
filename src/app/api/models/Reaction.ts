import { Schema, model, Document } from "mongoose";
import { IUser } from "./User";
import { IMessage } from "./Message";

interface IReaction extends Document {
  messageId: IMessage["_id"];
  userId: IUser["_id"];
  reaction: string;
}

const ReactionSchema = new Schema<IReaction | any>(
  {
    messageId: { type: Schema.Types.ObjectId, ref: "Message", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reaction: { type: String, enum: ["like", "love", "laugh", "wow", "sad", "angry"], required: true },
  },
  { timestamps: true }
);

const Reaction = model<IReaction>("Reaction", ReactionSchema);
export { Reaction };  export type { IReaction };

