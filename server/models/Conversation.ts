import { model, Schema, Types } from "mongoose";

interface IConversation {
  participants: Types.Array<string>;
  newUpdate: boolean;
  lastUpdate: Date;
}

const ConversationSchema = new Schema<IConversation>({
  participants: {
    type: [String],
    required: true,
  },
  newUpdate: {
    type: Boolean,
    default: false,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = model<IConversation>("Conversation", ConversationSchema);

export default Conversation;
