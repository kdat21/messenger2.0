import {
  SButton,
  SContainer,
  SHeader,
  SConversationSelect,
  SSearch,
  SSearchInput,
} from "../../styles/Dashboard/SecondSiderbar";
import newConversationIcon from "../../assets/create-new-conversation.svg";
import searchIcon from "../../assets/search-icon.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import ConversationSelect from "./ConversationSelect";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPeople } from "../../store/features/people/peopleSlice";
import {
  getConversations,
  selectConversation,
} from "../../store/features/conversation/conversationSlice";
import { useTheme } from "@mui/material/styles";
import { SSVG } from "../../styles/Dashboard/Sidebar";

const SecondSidebar = () => {
  // State
  const { conversationLoading, conversations } =
    useAppSelector(selectConversation);
  const { peopleLoading } = useAppSelector(selectPeople);
  const theme = useTheme()

  const dispatch = useAppDispatch();

  // Local state
  const [searchConversation, setSearchConversation] = useState("");

  // Navigate
  const navigate = useNavigate();

  // Get all conversations
  useEffect(() => {
    dispatch(getConversations());
  }, []);

  let body;

  if (conversationLoading || peopleLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else
    body = (
      <SConversationSelect>
        {conversations?.map((conversation) => (
          <ConversationSelect
            key={conversation._id}
            conversation={conversation}
          />
        ))}
      </SConversationSelect>
    );

  const createNewConversation = () => navigate("new");

  const onChangeSearchConversation = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchConversation(event.target.value);
  };

  return (
    <SContainer $borderColor={theme.palette.divider}>
      <SHeader>
        Chats
        <SButton $backgroundColor={theme.palette.background.default}
          $backgroundHover={theme.palette.action.hover}
          $backgroundFocus={theme.palette.action.focus} className="shadow-none" onClick={createNewConversation}>
          <SSVG src={newConversationIcon} color={theme.palette.text.primary} />
        </SButton>
      </SHeader>

      <SSearch>
        <img src={searchIcon} alt="searchIcon" />
        <SSearchInput placeholder="Search Messenger" />
      </SSearch>

      {body}
    </SContainer>
  );
};

export default SecondSidebar;
