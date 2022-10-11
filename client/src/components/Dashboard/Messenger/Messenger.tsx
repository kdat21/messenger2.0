import { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../../../contexts/authContext";
import { ConversationContext } from "../../../contexts/conversationContext";
import { SContainer } from "../../../styles/Dashboard/Messenger/Messenger";
import { AuthStateType, ConversationStateType } from "../../../types";
import Chat from "./Chat";
import MessBody from "./MessBody";
import MessHeader from "./MessHeader";

const Messenger = ({ conversationId }: { conversationId: string }) => {
  // Context
  const {
    conversationState: { conversationLoading, conversation },
    findConversation,
  } = useContext(ConversationContext) as ConversationStateType;

  const {authState: {socket}} = useContext(AuthContext) as AuthStateType

  useEffect(() => {
    findConversation(conversationId);
    socket!.emit('joinConversation', conversationId)
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
