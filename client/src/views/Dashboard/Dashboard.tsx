import { SContainer } from "../../styles/Dashboard/Dashboard";
import Sidebar from "../../components/Dashboard/Sidebar";
import ChatsSidebar from "../../components/Dashboard/ChatsSidebar";
import { MouseEvent, useState } from "react";
import PeopleSidebar from "../../components/Dashboard/PeopleSidebar";
import Messenger from "../../components/Dashboard/Messenger/Messenger";
import { useParams } from "react-router-dom";
import usePrevious from "../../utils/usePrevious";
import { AuthStateType } from "../../types";
import NewConversation from "../../components/Dashboard/NewConversation/NewConversation";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/features/auth/authSlice";

const Dashboard = ({dashboardRoute}: {dashboardRoute: string}) => {
  // State
  const {socket} = useAppSelector(selectAuth)

  // Local state
  const [openState, setOpenState] = useState(false);

  // Handle sidebar collapse
  const handleCollapse = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    
    setOpenState(!openState)
  };
  
  // Handle conversation body &   // Detect router change to leave socket room
  const {conversationId} = useParams()

  const prevConversationId = usePrevious(conversationId!)

  // useEffect(() => {
  //   if(prevConversationId) socket!.emit('leaveConversation', prevConversationId)
  // }, [conversationId]);
  
  const body = conversationId ? conversationId === 'new' ? <NewConversation /> : <Messenger conversationId={conversationId} /> : ''

  return (
    <SContainer>
      <Sidebar isOpen={openState} toggleSidebar={handleCollapse}/>
      {dashboardRoute === 'chats' && <ChatsSidebar />}
      {dashboardRoute === 'people' && <PeopleSidebar />}
      {body}
    </SContainer>
  );
};

export default Dashboard;
