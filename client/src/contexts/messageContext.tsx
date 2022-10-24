// import axios from "axios";
// import { createContext, FC, useReducer } from "react";
// import messageReducer from "../reducers/messageReducer";
// import { MessageState, MessageStateType, Props } from "../types";
// import {
//   apiUrl,
//   GET_CONVERSATION_CONTENT,
//   SEND_MESSAGE,
// } from "./constants";

// const initialState: MessageState = {
//   messageLoading: true,
//   conversationContent: [],
//   message: null,
// };

// export const MessageContext = createContext<MessageStateType | null>(null);

// const MessageContextProvider: FC<Props> = ({ children }) => {
//   const [messageState, dispatch] = useReducer(messageReducer, initialState);

//   // Get conversation content
//   const getConversationContent = async (conversationId: string) => {
//     try {
//       const response = await axios.get(`${apiUrl}/t/${conversationId}`);
//       const { success, conversationContent } = response.data;
//       dispatch({
//         type: GET_CONVERSATION_CONTENT,
//         payload: { conversationContent: success ? conversationContent : null },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Send message
//   const sendMessage = async (content: string, conversationId: string) => {
//     try {
//       const response = await axios.post(`${apiUrl}/t/${conversationId}`, {
//         content,
//       });
//       if (response.data.success)
//         dispatch({
//           type: SEND_MESSAGE,
//           payload: { message: response.data.message },
//         });
//     } catch (error) {
//       dispatch({
//         type: SEND_MESSAGE,
//         payload: { message: null },
//       });
//     }
//   };

//   // Get last message to show in Chats Sidebar
//   const getLastMessage = async (conversationId: string) => {
//     try {
//       const response = await axios.get(`${apiUrl}/t/lastmessage/${conversationId}`);
//         return response.data
//     } catch (error) {
//       return {success: false, message: error}
//     }
//   }

//   return (
//     <MessageContext.Provider
//       value={{ messageState, getConversationContent, sendMessage, getLastMessage }}
//     >
//       {children}
//     </MessageContext.Provider>
//   );
// };

// export default MessageContextProvider;
export {}