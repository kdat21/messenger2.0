import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { selectAuth } from "../../../store/features/auth/authSlice";
import { findConversation, selectConversation } from "../../../store/features/conversation/conversationSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SContainer } from "../../../styles/Dashboard/Messenger/Messenger";
import { AuthStateType, ConversationStateType } from "../../../types";
import Chat from "./Chat";
import MessBody from "./MessBody";
import MessHeader from "./MessHeader";

const Messenger = ({ conversationId }: { conversationId: string }) => {
  // State
  const  { conversationLoading, conversation } = useAppSelector(selectConversation)
  const {socket} = useAppSelector(selectAuth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(findConversation(conversationId));
    // socket!.emit('joinConversation', conversationId)
  }, [conversationId]);

  // Handle body
  let body = null;

  if (conversationLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (conversation !== null)
    body = (
      <>
        <MessHeader />
        <MessBody />
        <Chat />
      </>
    );

  return <SContainer>{body}</SContainer>;
};

export default Messenger;
