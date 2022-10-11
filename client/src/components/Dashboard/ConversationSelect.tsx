import Avatar from "@mui/material/Avatar";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { ConversationContext } from "../../contexts/conversationContext";
import { MessageContext } from "../../contexts/messageContext";
import { PeopleContext } from "../../contexts/peopleContext";
import {
  SContainer,
  SConversationInfo,
  SDot,
  SRecipientText,
  SSecondaryText,
  STextContainer,
  STime,
} from "../../styles/Dashboard/ConversationSelect";
import {
  AuthStateType,
  ConversationType,
  MessageStateType,
  MessageType,
  PeopleStateType,
  ConversationStateType,
} from "../../types";
import setConversationName from "../../utils/setConversationName";

const ConversationSelect = ({
  conversation: { _id, participants },
}: {
  conversation: ConversationType;
}) => {
  // Context
  const {
    peopleState: { people },
  } = useContext(PeopleContext) as PeopleStateType;

  const {
    authState: { user },
  } = useContext(AuthContext) as AuthStateType;

  const { focusConversation, setFocusConversation } = useContext(
    ConversationContext
  ) as ConversationStateType;

  const {
    messageState: { conversationContent },
    getLastMessage,
  } = useContext(MessageContext) as MessageStateType;

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
    setFocusConversation(_id);
    navigate(_id);
  };

  return (
    <SContainer
      onClick={handleSelectConversation}
      $focus={focusConversation === _id ? true : false}
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
