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
import {
  getConversationContent,
  sendMessage,
} from "../../../store/features/message/messageSlice";
import { useTheme } from "@mui/material/styles";
import { useSocket } from "../../../hooks/useSocket";
import { Socket } from "socket.io-client";
// import { socket } from "../../../App";

const Chat = ({socket}: {socket: Socket | null}) => {
  // State
  const { conversation } = useAppSelector(selectConversation);
  const theme = useTheme();

  const dispatch = useAppDispatch();

  // Local state
  const [messageContent, setMessageContent] = useState("");

  const onChangeMessContent = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageContent(event.target.value);
  };

  const onSubmitSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const message = await dispatch(
        sendMessage({
          content: messageContent,
          conversationId: conversation!._id,
        })
      ).unwrap();
      // socket.emit("sendMessage", message);
      socket?.emit("sendMessage", message);
      setMessageContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SContainer $borderColor={theme.palette.divider}>
      <SForm
        onSubmit={onSubmitSendMessage}
        $backgroundColor={theme.palette.action.focus}
      >
        <Form.Control
          placeholder="Aa"
          className="shadow-none"
          onChange={onChangeMessContent}
          value={messageContent}
        />
        <SButton
          type="submit"
          className="shadow-none"
          $backgroundColor={theme.palette.background.default}
          $backgroundHover={theme.palette.action.hover}
          $backgroundFocus={theme.palette.action.focus}
        >
          <img src={sendIcon} alt="sendIcon" />
        </SButton>
      </SForm>
    </SContainer>
  );
};

export default Chat;
