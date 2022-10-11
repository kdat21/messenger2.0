import { model, Schema } from "mongoose";
import moment from 'moment-timezone';

interface IMessage {
  conversationId: string;
  sender: string;
  content: string;
  sentAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  conversationId: {
    type: String,
    required: true,
  },

  sender: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = model<IMessage>('Message', MessageSchema)

export default Message