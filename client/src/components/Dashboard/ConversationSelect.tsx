import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../store/features/auth/authSlice";
import {
  selectConversation,
  setFocusConversation,
} from "../../store/features/conversation/conversationSlice";
import {
  getLastMessage,
  selectMessage,
} from "../../store/features/message/messageSlice";
import { selectPeople } from "../../store/features/people/peopleSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  SContainer,
  SConversationInfo,
  SDot,
  SRecipientText,
  SSecondaryText,
  STextContainer,
  STime,
} from "../../styles/Dashboard/ConversationSelect";
import { ConversationType, MessageType } from "../../types";
import setConversationName from "../../utils/setConversationName";

const ConversationSelect = ({
  conversation: { _id, participants },
}: {
  conversation: ConversationType;
}) => {
  // State
  const { people } = useAppSelector(selectPeople);
  const { user } = useAppSelector(selectAuth);
  const { focusConversation } = useAppSelector(selectConversation);
  const { conversationContent } = useAppSelector(selectMessage);
  const theme = useTheme()

  const dispatch = useAppDispatch();

  // Local state
  const [lastMessage, setLastMessage] = useState<MessageType | null>(null);

  const setConversationInfo = async () => {
    try {
      const lastMessageData = await getLastMessage(_id);
      if (lastMessageData.success) {
        let timestamp: string = "1m";

        const time =
          Date.now() - Date.parse(lastMessageData.lastMessage!.sentAt);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        if (days > 0) timestamp = `${days}d`;
        else {
          const hours = Math.floor(time / (1000 * 60 * 60));
          if (hours > 0) timestamp = `${hours}h`;
          else {
            const minutes = Math.floor(time / (1000 * 60));
            if (minutes > 0) timestamp = `${minutes}m`;
          }
        }

        setLastMessage({ ...lastMessageData.lastMessage, sentAt: timestamp });
      } else console.log(lastMessageData.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setConversationInfo();
  }, [JSON.stringify(conversationContent)]);

  // Navigate
  const navigate = useNavigate();

  // Set conversation name
  const recipientUsers = setConversationName(participants, user, people);

  const handleSelectConversation = () => {
    dispatch(setFocusConversation(_id));
    navigate(_id);
  };

  return (
    <SContainer
      onClick={handleSelectConversation}
      $focus={focusConversation === _id ? true : false}
      $backgroundColor={theme.palette.action.hover}
    >
      <Avatar sx={{ width: 40, height: 40 }} className="me-2">
        {recipientUsers[0].toUpperCase()}
      </Avatar>
      <STextContainer>
        <SRecipientText>{recipientUsers}</SRecipientText>
        <SSecondaryText>
          <SConversationInfo>{`${
            people.find((person) => lastMessage?.sender === person._id)
              ?.username
          }: ${lastMessage?.content}`}</SConversationInfo>
          <SDot>.</SDot>
          <STime>{lastMessage?.sentAt}</STime>
        </SSecondaryText>
      </STextContainer>
    </SContainer>
  );
};

export default ConversationSelect;
