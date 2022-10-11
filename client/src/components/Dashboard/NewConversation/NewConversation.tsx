import { useContext } from "react";
import { Toast } from "react-bootstrap";
import { ConversationContext } from "../../../contexts/conversationContext";
import { SContainer } from "../../../styles/Dashboard/Messenger/Messenger";
import { ConversationStateType } from "../../../types";
import NewConversationBody from "./NewConversationBody";
import NewConversationHeader from "./NewConversationHeader";

const NewConversation = () => {
  const {
    showToast: { show, message, type },
    setShowToast,
  } = useContext(ConversationContext) as ConversationStateType;

  return (
    <SContainer>
      <NewConversationHeader />
      <NewConversationBody />
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: "",
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </SContainer>
  );
};

export default NewConversation;
