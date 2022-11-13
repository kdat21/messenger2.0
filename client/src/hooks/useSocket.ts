import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { receiveMessage } from "../store/features/message/messageSlice";
import { useAppDispatch } from "../store/hooks";

export const useSocket = (namespace: string) => {
  const [socket, setSocket] = useState<Socket | null>(
    null
  );

  useEffect(() => {
    setSocket(io(`http://localhost:5000/${namespace}`))
  }, [])

  return {
    socket
  };
};
