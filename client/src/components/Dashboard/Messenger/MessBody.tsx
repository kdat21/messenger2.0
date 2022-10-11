import { useContext, useEffect, useRef } from "react";
import { OverlayTrigger, Spinner } from "react-bootstrap";
import { AuthContext } from "../../../contexts/authContext";
import { ConversationContext } from "../../../contexts/conversationContext";
import { MessageContext } from "../../../contexts/messageContext";
import {
  SContainer,
  SMessageContentContainer,
  SToolTip,
} from "../../../styles/Dashboard/Messenger/MessBody";
import {
  AuthStateType,
  ConversationStateType,
  MessageStateType,
} from "../../../types";

const MessBody = () => {
  // Context
  const {
    conversationState: { conversation },
  } = useContext(ConversationContext) as ConversationStateType;

  const {
    authState: { user, socket },
  } = useContext(AuthContext) as AuthStateType;

  const {
    messageState: { messageLoading, conversationContent },
    getConversationContent,
  } = useContext(MessageContext) as MessageStateType;

  const { _id } = conversation!;

  // Auto scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Get conversation content
  useEffect(() => {
    getConversationContent(_id);
    scrollToBottom();
  }, [_id]);

  useEffect(() => {
    scrollToBottom();
  }, [JSON.stringify(conversationContent)]);

  useEffect(() => {
    socket!.on('newMessageSent', () => {
        // console.log('a')
        getConversationContent(_id);
    })
  }, [])

  // Body
  const body = messageLoading ? (
    <div className="d-flex justify-content-center mt-2">
      <Spinner animation="border" variant="info" />
    </div>
  ) : (
    conversationContent!.map((message) => (
      <OverlayTrigger
        key={message.sentAt}
        placement="left"
        overlay={
          <SToolTip className="shadow">
            {new Date(message.sentAt).toLocaleString()}
          </SToolTip>
        }
      >
        <SMessageContentContainer
          $sender={message.sender === user!._id ? true : false}
        >
          {message.content}
        </SMessageContentContainer>
      </OverlayTrigger>
    ))
  );

  return (
    <SContainer>
      <div className="mt-auto" />
      {body}
      <div ref={messagesEndRef} />
    </SContainer>
  );
};

export default MessBody;
