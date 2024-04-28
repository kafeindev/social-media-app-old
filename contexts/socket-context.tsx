"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";

import { useUserContext } from "./user-context";

const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      return;
    }

    const connectSocket = async () => {
      fetch("/api/socket");

      const newSocket = io(`:3001`, {
        path: "/api/socket",
        addTrailingSlash: false,
      });

      newSocket.on("connect", () => {
        newSocket.emit("join", user?.userId);
      });
      newSocket.on("disconnect", () => {
        console.log("socket disconnect");
      });

      setSocket(newSocket);
    };

    if (!socket || !socket.active) {
      connectSocket();
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user]);

  const memoized = useMemo(() => socket, [socket]);

  return (
    <SocketContext.Provider value={memoized}>{children}</SocketContext.Provider>
  );
};

const useSocketContext = () => {
  return useContext(SocketContext);
};

export { SocketProvider, SocketContext, useSocketContext };
