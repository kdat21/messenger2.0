import {
  SContainer,
  SForm,
  SButton,
} from "../../../styles/Dashboard/Messenger/Chat";
import sendIcon from "../../../assets/send-icon.svg";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Form } from "react-bootstrap";
import {
  ConversationStateType,
  MessageStateType,
  AuthStateType,
} from "../../../types";
import { MessageContext } from "../../../contexts/messageContext";
import { ConversationContext } from "../../../contexts/conversationContext";
import { AuthContext } from "../../../contexts/authContext";

const Chat = () => {
  // Context
  const { sendMessage } = useContext(MessageContext) as MessageStateType;

  const {
    conversationState: { conversation },
  } = useContext(ConversationContext) as ConversationStateType;

  const {
    authState: { socket },
  } = useContext(AuthContext) as AuthStateType;

  // Local state
  const [messageContent, setMessageContent] = useState("");

  const onChangeMessContent = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageContent(event.target.value);
  };

  const onSubmitSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      sendMessage(messageContent, conversation!._id);
      socket!.emit("sendMessage", messageContent, conversation!._id);
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
