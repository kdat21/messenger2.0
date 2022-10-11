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
import { ChangeEvent, useContext, useEffect,useState } from "react";
import { ConversationContext } from "../../contexts/conversationContext";
import {
  ConversationStateType,
  PeopleStateType,
  AuthStateType,
} from "../../types";
import { Spinner } from "react-bootstrap";
import ConversationSelect from "./ConversationSelect";
import { PeopleContext } from "../../contexts/peopleContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { SAutocomplete } from "../../styles/Dashboard/NewConversationHeader";
import TextField from "@mui/material/TextField";

const SecondSidebar = () => {
  // Context
  const {
    conversationState: { conversationLoading, conversations },
    getConversations,
  } = useContext(ConversationContext) as ConversationStateType;

  const {
    peopleState: { peopleLoading },
  } = useContext(PeopleContext) as PeopleStateType;

  const {
    authState: { socket },
  } = useContext(AuthContext) as AuthStateType;

  // Local state
  const [searchConversation, setSearchConversation] = useState('')

  // Navigate
  const navigate = useNavigate();

  // Get all conversations
  useEffect(() => {
    getConversations();
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
    <SContainer>
      <SHeader>
        Chats
        <SButton className="shadow-none" onClick={createNewConversation}>
          <img src={newConversationIcon} alt="newConversationIcon" />
        </SButton>
      </SHeader>

      <SSearch>
        <img src={searchIcon} alt="searchIcon" />
        <SSearchInput placeholder="Search Messenger" />
      </SSearch>
      {/* <SAutocomplete
        freeSolo
        options={conversations!.map(conversation => conversation.conversationName)}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Search Messenger"
            onChange={onChangeSearchConversation}
            value={searchConversation}
            InputLabelProps={{
              shrink: true,
            }}
            // onKeyDown={}
          />
        )}
      /> */}

      {body}
    </SContainer>
  );
};

export default SecondSidebar;
