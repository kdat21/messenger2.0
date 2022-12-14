import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import peopleReducer from "./features/people/peopleSlice";
import conversationReducer from "./features/conversation/conversationSlice";
import messageReducer from "./features/message/messageSlice";
import themeReducer from "./features/theme/themeSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ['message'],
  stateReconciler: autoMergeLevel2,
};

const messagePersistConfig = {
  key: 'message',
  storage,
  blacklist: ['conversationContent']
}

const rootReducers = combineReducers({
  auth: authReducer,
  people: peopleReducer,
  conversation: conversationReducer,
  message: persistReducer(messagePersistConfig, messageReducer),
  theme: themeReducer,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducers>>(
  rootPersistConfig,
  rootReducers
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
