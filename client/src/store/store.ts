import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import peopleReducer from "./features/people/peopleSlice";
import conversationReducer from "./features/conversation/conversationSlice";
import messageReducer from "./features/message/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    people: peopleReducer,
    conversation: conversationReducer,
    message: messageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;