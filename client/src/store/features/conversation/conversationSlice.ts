import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import { ConversationState, ToastType } from "../../../types";
import { RootState } from "../../store";

const initialState: ConversationState = {
  conversationLoading: true,
  conversations: [],
  conversation: null,
  focusConversation: "",
  showToast: {
    show: false,
    message: "",
    type: "",
  },
};

// Get all conversations
export const getConversations = createAsyncThunk(
  "conversation/get",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/t`);
      if (response.data.success) {
        return {
          conversations: response.data.conversations,
        };
      }
    } catch (error) {
      return { conversations: [] };
    }
  }
);

// Find conversation
export const findConversation = createAsyncThunk(
  "conversation/find",
  async (conversationId: string) => {
    try {
      const response = await axios.get(`${apiUrl}/t/${conversationId}`);
      return {
        conversation: response.data.success ? response.data.conversation : null,
      };
    } catch (error) {
      return {
        conversation: null,
      };
    }
  }
);

// Create new conversation
export const createConversation = createAsyncThunk(
  "conversation/create",
  async (recipientEmail: string) => {
    try {
      const response = await axios.post(`${apiUrl}/t`, { recipientEmail });
      if (response.data.success)
        return {
          conversation: response.data.conversation,
        };
      // return response.data;
    } catch (error) {
      return {
        conversation: null,
      };
      // if (error instanceof AxiosError) return error.response!.data;
      // return { success: false, message: error };
    }
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setFocusConversation: (state, action: PayloadAction<string>) => {
      state.focusConversation = action.payload;
    },
    setShowToast: (state, action: PayloadAction<ToastType>) => {
      state.showToast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state) => {
        state.conversationLoading = true;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.conversationLoading = false;
        state.conversations = action.payload?.conversations;
      })
      .addCase(getConversations.rejected, (state) => {
        state.conversationLoading = false;
        state.conversations = [];
      })
      .addCase(findConversation.fulfilled, (state, action) => {
        state.conversation = action.payload.conversation;
      })
      .addCase(findConversation.rejected, (state) => {
        state.conversation = null;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversation = action.payload?.conversation;
      })
      .addCase(createConversation.rejected, (state) => {
        state.conversation = null;
      })

  },
});

export const { setFocusConversation, setShowToast } = conversationSlice.actions;

export const selectConversation = (state: RootState) => state.conversation;

export default conversationSlice.reducer;
