import { CREATE_CONVERSATION, FIND_CONVERSATION, GET_CONVERSATIONS } from "../contexts/constants";
import { ConversationAction, ConversationState, ConversationType } from "../types"

const conversationReducer = (state: ConversationState, action: ConversationAction) => {
  const {type, payload: {conversations, conversation}} = action;

  switch (type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversationLoading: false,
        conversations
      }

    case FIND_CONVERSATION:
      return {
        ...state,
        conversationLoading: false,
        conversation
      }

    case CREATE_CONVERSATION:
      return {
        ...state,
        conversationLoading: false,
        conversation,
        conversations: [...state.conversations!, conversation as ConversationType]
      }
  
    default:
        return state;
  }
}

export default conversationReducer