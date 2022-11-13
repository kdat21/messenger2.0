import { SContainer } from "../../styles/Dashboard/Dashboard";
import Sidebar from "../../components/Dashboard/Sidebar";
import ChatsSidebar from "../../components/Dashboard/ChatsSidebar";
import { MouseEvent, useEffect, useState } from "react";
import PeopleSidebar from "../../components/Dashboard/PeopleSidebar";
import Messenger from "../../components/Dashboard/Messenger/Messenger";
import { useParams } from "react-router-dom";
import NewConversation from "../../components/Dashboard/NewConversation/NewConversation";
import { useAppDispatch } from "../../store/hooks";
import {
  findConversation,
  setFocusConversation,
} from "../../store/features/conversation/conversationSlice";
import { useSocket } from "../../hooks/useSocket";

const Dashboard = ({ dashboardRoute }: { dashboardRoute: string }) => {
  // State
  // const { socket } = useAppSelector(selectAuth);
  const {socket} = useSocket('message')

  const dispatch = useAppDispatch();

  // Local state
  const [openState, setOpenState] = useState(false);

  // Handle sidebar collapse
  const handleCollapse = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setOpenState(!openState);
  };

  // Handle conversation body
  const { conversationId } = useParams();

  useEffect(() => {
    if (conversationId && conversationId !== "new") {
      dispatch(findConversation(conversationId));
      socket?.emit("joinConversation", conversationId);
      // joinConversation(conversationId)
      
      return () => {
        socket?.emit("leaveConversation", conversationId);
        // leaveConversation(conversationId)
      }
    }
  }, [conversationId]);

  const body = conversationId ? (
    conversationId === "new" ? (
      <NewConversation />
    ) : (
      <Messenger socket={socket} />
    )
  ) : (
    ""
  );

  if (!conversationId || conversationId === "new")
    dispatch(setFocusConversation(""));

  return (
    <SContainer>
      <Sidebar isOpen={openState} toggleSidebar={handleCollapse} socket={socket} />
      {dashboardRoute === "chats" && <ChatsSidebar />}
      {dashboardRoute === "people" && <PeopleSidebar />}
      {body}
    </SContainer>
  );
};

export default Dashboard;
