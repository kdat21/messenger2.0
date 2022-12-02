import { Request, Response } from "express";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import User from "../models/User";
import { BSONTypeError } from "bson";
import { Types } from "mongoose";
import { ErrorHandler, wrapAsync } from "../helpers/ErrorHandler";

export const messageCreateConversation = wrapAsync(
  async (req: Request, res: Response) => {
    const { recipientEmail } = req.body;

    // Simple validation
    if (recipientEmail === "")
      throw new ErrorHandler(400, "Missing recipient email");

    // Check for existing user
    const recipientUser = await User.findOne({ email: recipientEmail });

    if (!recipientUser) throw new ErrorHandler(400, "User not found");

    // Check if recipient user is current user
    if (recipientUser._id.toString() === req.userId)
      throw new ErrorHandler(
        400,
        "You are trying to create new conversation with yourself!"
      );

    //Check if the conversation existed
    const participants: Array<string> = [
      req.userId!,
      recipientUser!._id.toString(),
    ];

    const conversation = await Conversation.findOne({
      participants: { $all: participants },
    });
    if (conversation)
      return res.status(400).json({
        success: false,
        errorCode: "ERR_CON_EXIST",
        message: "Conversation existed",
        conversation,
      });

    // All good
    const newConversation = new Conversation({ participants });
    await newConversation.save();

    res.json({
      success: true,
      message: "Have nice chat!",
      conversation: newConversation,
    });
  }
);

export const messageGetConversation = wrapAsync(
  async (req: Request, res: Response) => {
    const conversations = await Conversation.find({
      participants: req.userId,
    });
    // .sort({ lastUpdate: -1 })
    res.json({ success: true, conversations });

    throw new ErrorHandler(500, "Internal server error");
  }
);

export const messageGetConversationContent = wrapAsync(
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;

    // Check if conversation exist
    const conversation = await Conversation.findById(
      new Types.ObjectId(conversationId)
    );

    if (!conversation) throw new ErrorHandler(404, "Conversation not found");

    // All good
    const conversationContent = await Message.find({ conversationId })
      .sort({ lastUpdate: -1 })
      .select("-_id -conversationId");
    res.json({ success: true, conversation, conversationContent });
  }
);

export const messageGetLastMessage = wrapAsync(
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;

    // Check if conversation exist
    const conversation = await Conversation.findById(
      new Types.ObjectId(conversationId)
    );

    if (!conversation) throw new ErrorHandler(404, "Conversation not found");

    // All good
    const lastMessage = await Message.findOne({ conversationId })
      .sort({ _id: -1 })
      .select("-_id -conversationId");
    res.json({ success: true, lastMessage });
  }
);

export const messageSendMessage = wrapAsync(
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const { content } = req.body;

    // Check if conversation exist
    const conversation = await Conversation.findById(
      new Types.ObjectId(conversationId)
    );

    if (!conversation) throw new ErrorHandler(404, "Conversation not found");

    // Simple validation
    if (content === "")
      throw new ErrorHandler(400, "Missing content of message");

    // All good

    const newMessage = new Message({
      conversationId,
      sender: req.userId,
      content,
    });
    await newMessage.save();
    await conversation.updateOne({ lastUpdate: newMessage.sentAt });

    res.json({ success: true, message: newMessage });
  }
);
