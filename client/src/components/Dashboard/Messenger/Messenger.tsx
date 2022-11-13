import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { useSocket } from "../../../hooks/useSocket";
import { findConversation, selectConversation } from "../../../store/features/conversation/conversationSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SContainer } from "../../../styles/Dashboard/Messenger/Messenger";
import Chat from "./Chat";
import MessBody from "./MessBody";
import MessHeader from "./MessHeader";

const Messenger = ({socket}: {socket: Socket | null}) => {
  // State
  const  { conversationLoading, conversation } = useAppSelector(selectConversation)
  // const {joinConversation, leaveConversation} = useSocket('message')

  // useEffect(() => {
  //     joinConversation(conversation!._id)
      
  //     return () => {
  //       // socket.emit("leaveConversation", conversationId);
  //       leaveConversation(conversation!._id)
  //     }
  // }, []);

  // Handle body
  let body = null;

  if (conversationLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (conversation !== null)
    body = (
      <>
        <MessHeader />
        <MessBody socket={socket} />
        <Chat socket={socket} />
      </>
    );

  return <SContainer>{body}</SContainer>;
};

export default Messenger;
