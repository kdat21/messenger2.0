import { Toast } from "react-bootstrap";
import { selectConversation, setShowToast } from "../../../store/features/conversation/conversationSlice";
import { useAppSelector } from "../../../store/hooks";
import { SContainer } from "../../../styles/Dashboard/Messenger/Messenger";
import NewConversationBody from "./NewConversationBody";
import NewConversationHeader from "./NewConversationHeader";

const NewConversation = () => {
  const {
    showToast: { show, message, type },
  } = useAppSelector(selectConversation)

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
