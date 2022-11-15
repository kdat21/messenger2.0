import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = (namespace: string) => {
  const [socket, setSocket] = useState<Socket | null>(
    null
  );

  useEffect(() => {
    setSocket(io(`http://localhost:5000/${namespace}`))
  }, [])

  return socket;
};
