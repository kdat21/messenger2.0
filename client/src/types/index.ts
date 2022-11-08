import { Theme } from "@mui/material/styles";
import { MouseEvent } from "react";
import { Socket } from "socket.io-client";

// Theme Type
export interface ThemeState {
  themeMode: string;
}

// Auth Type
export interface UserType {
  _id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  online: boolean;
}

export interface AuthState {
  authLoading: boolean;
  isAuthenticated: boolean;
  user: UserType | null;
  socket: Socket | null;
}

export interface AuthAction {
  type: string;
  payload: {
    isAuthenticated: boolean;
    user: UserType | null;
    socket: Socket | null;
  };
}

export type AuthStateType = {
  authState: AuthState;
  registerUser: (registerForm: {
    email: string;
    username: string;
    password: string;
  }) => Promise<any>;
  verifyUser: (userId: string, verifyString: string) => Promise<any>;
  loginUser: (userForm: { email: string; password: string }) => Promise<any>;
  logoutUser: () => Promise<any>;
};

// Conversation Type
export interface ConversationType {
  _id: string;
  participants: Array<string>;
  lastUpdate: string;
  conversationName: string;
}

export interface ConversationState {
  conversationLoading: boolean;
  conversations?: Array<ConversationType>;
  conversation?: ConversationType | null;
  focusConversation: string;
  showToast: ToastType;
}

export interface ConversationAction {
  type: string;
  payload: {
    conversations?: Array<ConversationType>;
    conversation?: ConversationType | null;
  };
}

export type ConversationStateType = {
  conversationState: ConversationState;
  getConversations: () => Promise<any>;
  findConversation: (conversationId: string) => any;
  createConversation: (recipientEmail: string) => Promise<any>;
  showToast: {
    show: boolean;
    message: string;
    type: string;
  };
  setShowToast: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      message: string;
      type: string;
    }>
  >;
  focusConversation: string;
  setFocusConversation: React.Dispatch<React.SetStateAction<string>>;
};

// Message Type
export interface MessageType {
  sender: string;
  content: string;
  sentAt: string;
}

export interface MessageState {
  messageLoading: boolean;
  conversationContent?: Array<MessageType>;
  message?: MessageType | null;
}

export interface MessageAction {
  type: string;
  payload: {
    conversationContent?: Array<MessageType>;
    message?: MessageType | null;
  };
}

export type MessageStateType = {
  messageState: MessageState;
  getConversationContent: (conversationId: string) => Promise<any>;
  sendMessage: (content: string, conversationId: string) => Promise<any>;
  getLastMessage: (conversationId: string) => Promise<any>;
};

// People Type
export interface PersonType {
  _id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  online: boolean;
}

export interface PeopleState {
  peopleLoading: boolean;
  people: Array<PersonType>;
}

export interface PeopleAction {
  type: string;
  payload: { people: Array<PersonType> };
}

export type PeopleStateType = {
  peopleState: PeopleState;
  getPeople: () => Promise<any>;
  findPerson: (userId: string) => Promise<any>;
};

//
export interface Props {
  children: React.ReactNode;
}

export interface ToggleSidebarProps {
  isOpen: boolean;
  toggleSidebar: (event: MouseEvent<HTMLElement>) => void;
}

export interface ToastType {
  show: boolean; message: string; type: string
}
