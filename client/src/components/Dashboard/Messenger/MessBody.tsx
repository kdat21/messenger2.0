import { useTheme } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import { OverlayTrigger, Spinner } from "react-bootstrap";
import { selectAuth } from "../../../store/features/auth/authSlice";
import { selectConversation } from "../../../store/features/conversation/conversationSlice";
import { getConversationContent, selectMessage } from "../../../store/features/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  SContainer,
  SMessageContentContainer,
  SToolTip,
} from "../../../styles/Dashboard/Messenger/MessBody";

const MessBody = () => {
  // State
  const { conversation } = useAppSelector(selectConversation)
  const { user, socket } = useAppSelector(selectAuth)
  const { messageLoading, conversationContent } = useAppSelector(selectMessage)
  const theme = useTheme()
  const abc = {
    
  }

  const dispatch = useAppDispatch()

  const { _id } = conversation!;

  // Auto scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Get conversation content
  useEffect(() => {
    dispatch(getConversationContent(_id));
    scrollToBottom();
  }, [_id]);

  useEffect(() => {
    scrollToBottom();
  }, [JSON.stringify(conversationContent)]);

  // useEffect(() => {
  //   socket!.on('newMessageSent', () => {
  //       // console.log('a')
  //       getConversationContent(_id);
  //   })
  // }, [])

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
          $senderColor={{$background: theme.palette.message?.sender.backgroundColor, $text: theme.palette.message?.sender.color} }
          $receiverColor={{$background: theme.palette.message?.receiver.backgroundColor, $text: theme.palette.message?.receiver.color} }
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
