import {
  GET_CONVERSATION_CONTENT,
  SEND_MESSAGE,
} from "../contexts/constants";
import { MessageAction, MessageState, MessageType } from "../types";

const messageReducer = (state: MessageState, action: MessageAction) => {
  const {
    type,
    payload: { conversationContent, message },
  } = action;

  switch (type) {

    case GET_CONVERSATION_CONTENT:
      return {
        ...state,
        messageLoading: false,
        conversationContent,
      };

    case SEND_MESSAGE:
      return {
        ...state,
        messageLoading: false,
        conversationContent: [...state.conversationContent!, message as MessageType],
        message,
      };

    default:
      return state;
  }
};

export default messageReducer;
