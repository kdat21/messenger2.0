import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ConversationContext } from "../../../contexts/conversationContext";
import { PeopleContext } from "../../../contexts/peopleContext";
import {
  SAutocomplete,
  SContainer,
} from "../../../styles/Dashboard/NewConversationHeader";
import { ConversationStateType, PeopleStateType } from "../../../types";

const NewConversationHeader = () => {
  // Context
  const { createConversation, setShowToast } = useContext(
    ConversationContext
  ) as ConversationStateType;

  const {peopleState: {people}} = useContext(PeopleContext) as PeopleStateType

  // Local state
  const [recipientEmail, setRecipientEmail] = useState("");

  // Navigate
  const navigate = useNavigate();

  const onChangeRecipientEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipientEmail(event.target.value);
  };

  const createNewConversation = async (
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        const createData = await createConversation(recipientEmail);
        if (!createData.success) {
          if (createData.errorCode === "ERR_CON_EXIST")
            navigate(createData.conversation._id);
          else
            setShowToast({
              show: true,
              message: createData.message,
              type: "danger",
            });
        }

        navigate(createData.conversation._id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SContainer>
      <SAutocomplete
        freeSolo
        id="combo-box-demo"
        options={people.map(person => person.email)}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Email"
            onChange={onChangeRecipientEmail}
            value={recipientEmail}
            InputLabelProps={{
              shrink: true,
            }}
            onKeyDown={createNewConversation}
          />
        )}
      />
    </SContainer>
  );
};

export default NewConversationHeader;
