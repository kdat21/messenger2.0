import { useTheme } from "@mui/material/styles";
import { selectAuth } from "../../../store/features/auth/authSlice";
import { selectConversation } from "../../../store/features/conversation/conversationSlice";
import { selectPeople } from "../../../store/features/people/peopleSlice";
import { useAppSelector } from "../../../store/hooks";
import {
  SContainer,
  SConversationName,
} from "../../../styles/Dashboard/Messenger/MessHeader";
import setConversationName from "../../../utils/setConversationName";

const MessHeader = () => {
  // State
  const { conversation } = useAppSelector(selectConversation)
  const { people } = useAppSelector(selectPeople)
  const { user } = useAppSelector(selectAuth);
  const theme = useTheme()

  const { participants } = conversation!;
  const conversationName = setConversationName(participants, user, people);

  return (
    <SContainer $borderColor={theme.palette.divider}>
      <SConversationName>{conversationName}</SConversationName>
    </SContainer>
  );
};

export default MessHeader;
