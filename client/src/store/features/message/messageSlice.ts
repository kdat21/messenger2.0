import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import { MessageState } from "../../../types";
import { RootState } from "../../store";

const initialState: MessageState = {
  messageLoading: true,
  conversationContent: [],
  message: null,
};

// Get conversation content
export const getConversationContent = createAsyncThunk(
  "message/getAll",
  async (conversationId: string) => {
    try {
      const response = await axios.get(`${apiUrl}/t/${conversationId}`);
      const { success, conversationContent } = response.data;
      return { conversationContent: success ? conversationContent : null };
    } catch (error) {
      console.log(error);
      return { conversationContent: null };
    }
  }
);

// Send message
export const sendMessage = createAsyncThunk(
  "message/send",
  async ({
    content,
    conversationId,
  }: {
    content: string;
    conversationId: string;
  }) => {
    try {
      const response = await axios.post(`${apiUrl}/t/${conversationId}`, {
        content,
      });
      if (response.data.success) return { message: response.data.message };
    } catch (error) {
      return { message: null };
    }
  }
);

// Get last message to show in Chats Sidebar
export const getLastMessage = async (conversationId: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/t/lastmessage/${conversationId}`
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error };
  }
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    receiveMessage: (state, action) => {
      state.conversationContent?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversationContent.pending, (state) => {
        state.messageLoading = true;
      })
      .addCase(getConversationContent.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.conversationContent = action.payload.conversationContent;
      })
      .addCase(getConversationContent.rejected, (state) => {
        state.messageLoading = false;
        state.conversationContent = [];
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.message = action.payload?.message;
        state.conversationContent?.push(action.payload?.message);
      })
      .addCase(sendMessage.rejected, (state) => {
        state.message = null;
      });
  },
});

export const { receiveMessage } = messageSlice.actions;

export const selectMessage = (state: RootState) => state.message;

export default messageSlice.reducer;
