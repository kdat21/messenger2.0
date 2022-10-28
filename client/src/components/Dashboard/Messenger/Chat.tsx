import {
  SContainer,
  SForm,
  SButton,
} from "../../../styles/Dashboard/Messenger/Chat";
import sendIcon from "../../../assets/send-icon.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectAuth } from "../../../store/features/auth/authSlice";
import { selectConversation } from "../../../store/features/conversation/conversationSlice";
import { getConversationContent, sendMessage } from "../../../store/features/message/messageSlice";

const Chat = () => {
  // State
  const { conversation } = useAppSelector(selectConversation)
  const { socket } = useAppSelector(selectAuth)

  const dispatch = useAppDispatch()

  // Local state
  const [messageContent, setMessageContent] = useState("");

  const onChangeMessContent = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageContent(event.target.value);
  };

  const onSubmitSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(sendMessage({content: messageContent, conversationId: conversation!._id}));
      // socket!.emit("sendMessage", messageContent, conversation!._id);
      dispatch(getConversationContent(conversation!._id));
      setMessageContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SContainer>
      <SForm onSubmit={onSubmitSendMessage}>
        <Form.Control
          placeholder="Aa"
          className="shadow-none"
          onChange={onChangeMessContent}
          value={messageContent}
        />
        <SButton type="submit" className="shadow-none">
          <img src={sendIcon} alt="sendIcon" />
        </SButton>
      </SForm>
    </SContainer>
  );
};

export default Chat;
