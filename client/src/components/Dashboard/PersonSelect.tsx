import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ConversationContext } from "../../contexts/conversationContext";
import { SToolTip } from "../../styles/Dashboard/Messenger/MessBody";
import {
  SContainer,
  SRecipientText,
} from "../../styles/Dashboard/PersonSelect";
import { ConversationStateType, PersonType } from "../../types";

const PersonSelect = ({
  person: { email, username },
}: {
  person: PersonType;
}) => {
  // Context
  const { createConversation } = useContext(
    ConversationContext
  ) as ConversationStateType;

  // Navigate
  const navigate = useNavigate();

  const handleSelectPerson = async () => {
    try {
      const createData = await createConversation(email);
      if (!createData.success) {
        if (createData.errorCode === "ERR_CON_EXIST")
          navigate(createData.conversation._id);
      }

      navigate(`../t/${createData.conversation._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OverlayTrigger
      key={email}
      placement="bottom"
      overlay={<SToolTip className="shadow">{email}</SToolTip>}
    >
      <SContainer onClick={handleSelectPerson}>
      <Avatar sx={{ width: 40, height: 40 }} className="me-3">
        {username[0].toUpperCase()}
      </Avatar>
        <SRecipientText>{username}</SRecipientText>
      </SContainer>
    </OverlayTrigger>
  );
};

export default PersonSelect;
