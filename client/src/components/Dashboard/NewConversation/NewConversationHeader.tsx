import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createConversation,
  setShowToast,
} from "../../../store/features/conversation/conversationSlice";
import { selectPeople } from "../../../store/features/people/peopleSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  SAutocomplete,
  SContainer,
} from "../../../styles/Dashboard/NewConversationHeader";

const NewConversationHeader = () => {
  // State
  const { people } = useAppSelector(selectPeople);
  const dispatch = useAppDispatch();

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
      // try {
      //   const createData = dispatch (createConversation(recipientEmail));
      //   if (!createData.success) {
      //     if (createData.errorCode === "ERR_CON_EXIST")
      //       navigate(createData.conversation._id);
      //     else
      //       setShowToast({
      //         show: true,
      //         message: createData.message,
      //         type: "danger",
      //       });
      //   }

      //   navigate(createData.conversation._id);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  return (
    <SContainer>
      <SAutocomplete
        freeSolo
        id="combo-box-demo"
        options={people.map((person) => person.email)}
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
