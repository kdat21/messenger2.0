// import axios, { AxiosError } from "axios";
// import { createContext, FC, useReducer, useState } from "react";
// import conversationReducer from "../reducers/conversationReducer";
// import { ConversationState, ConversationStateType, Props } from "../types";
// import {
//   apiUrl,
//   CREATE_CONVERSATION,
//   FIND_CONVERSATION,
//   GET_CONVERSATIONS,
// } from "./constants";

// const initialState: ConversationState = {
//   conversationLoading: true,
//   conversations: [],
//   conversation: null,
//   focusConversation: '',
//   showToast: {
//     show: false,
//     message: "",
//     type: "",
//   }
// };

// export const ConversationContext = createContext<ConversationStateType | null>(
//   null
// );

// const ConversationContextProvider: FC<Props> = ({ children }) => {
//   const [conversationState, dispatch] = useReducer(
//     conversationReducer,
//     initialState
//   );

//   const [focusConversation, setFocusConversation] = useState('')

//   const [showToast, setShowToast] = useState({
//     show: false,
//     message: "",
//     type: "",
//   });

//   // Get all conversations
//   const getConversations = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/t`);
//       if (response.data.success) {
//         dispatch({
//           type: GET_CONVERSATIONS,
//           payload: {
//             conversations: response.data.conversations,
//           },
//         });
//       } else {
        
//       }
//     } catch (error) {
//       dispatch({
//         type: GET_CONVERSATIONS,
//         payload: { conversations: [] },
//       });
//     }
//   };

//   // Find conversation
//   const findConversation = async (conversationId: string) => {
//     try {
//       const response = await axios.get(`${apiUrl}/t/${conversationId}`);
//       dispatch({
//         type: FIND_CONVERSATION,
//         payload: {
//           conversation: response.data.success
//             ? response.data.conversation
//             : null,
//           conversations: [],
//         },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Create new conversation
//   const createConversation = async (recipientEmail: string) => {
//     try {
//       const response = await axios.post(`${apiUrl}/t`, { recipientEmail });
//       if (response.data.success)
//         dispatch({
//           type: CREATE_CONVERSATION,
//           payload: {
//             conversation: response.data.conversation,
//           },
//         });

//       return response.data;
//     } catch (error) {
//       if (error instanceof AxiosError) return error.response!.data;
//       return { success: false, message: error };
//     }
//   };

//   return (
//     <ConversationContext.Provider
//       value={{
//         conversationState,
//         getConversations,
//         findConversation,
//         createConversation,
//         focusConversation,
//         setFocusConversation,
//         showToast,
//         setShowToast,
//       }}
//     >
//       {children}
//     </ConversationContext.Provider>
//   );
// };

// export default ConversationContextProvider;
export {}