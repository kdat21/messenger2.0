import { Router } from "express";
import { messageCreateConversation, messageGetConversation, messageGetConversationContent, messageGetLastMessage, messageSendMessage } from "../controllers/messageController";
import verifyToken from "../middleware/auth";

const router = Router();

// @route POST api/t
// @desc Create new conversation
// @access Private
router.post('/',verifyToken, messageCreateConversation)

// @route GET api/t
// @desc Get all conversations
// @access Private
router.get("/", verifyToken, messageGetConversation);

// @route GET api/t/:conversationId
// @desc Get content of conversation
// @access Private
router.get("/:conversationId", verifyToken, messageGetConversationContent);

// @route GET api/t/lastmessage/:conversationId
// @desc Get content of conversation
// @access Private
router.get("/lastmessage/:conversationId", verifyToken, messageGetLastMessage);

// @route POST api/t/:conversationId
// @desc Send message
// @access Private
router.post('/:conversationId',verifyToken, messageSendMessage)

export default router;
