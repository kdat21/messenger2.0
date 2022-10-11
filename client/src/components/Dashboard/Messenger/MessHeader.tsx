import { useContext } from "react"
import { AuthContext } from "../../../contexts/authContext"
import { ConversationContext } from "../../../contexts/conversationContext"
import { PeopleContext } from "../../../contexts/peopleContext"
import { SContainer, SConversationName } from "../../../styles/Dashboard/Messenger/MessHeader"
import { AuthStateType, ConversationStateType, PeopleStateType } from "../../../types"
import setConversationName from "../../../utils/setConversationName"

const MessHeader = () => {
  // Context
  const {conversationState: {conversation}} = useContext(ConversationContext) as ConversationStateType

  const {
    peopleState: { people },
  } = useContext(PeopleContext) as PeopleStateType;

  const {
    authState: { user },
  } = useContext(AuthContext) as AuthStateType;

  const {participants} = conversation!

  const conversationName = setConversationName(participants, user, people)

  return (
    <SContainer>
      <SConversationName>{conversationName}</SConversationName>
    </SContainer>
  )
}

export default MessHeader