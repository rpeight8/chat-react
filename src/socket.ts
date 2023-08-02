import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import { Rooms } from "./types";

let socket: Socket | null = null;

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    socket = io("http://localhost:3000/", {
      path: "/chat",
    });

    socket.on("connect", () => {
      setIsError(false);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsError(false);
      setIsConnected(false);
    });

    socket.on("connect_error", () => {
      setIsConnected(false);
      setIsError(true);
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, []);

  return {
    isConnected,
    isError,
    isConnecting: !isConnected && !isError,
  };
};

export const useOnRoomsUpdated = (onRoomsUpdated: (rooms: Rooms[]) => void) => {
  useEffect(() => {
    if (!socket) {
      throw new Error("Socket is not connected");
    }

    socket.on("rooms:updated", (rooms: Rooms[]) => {
      if (onRoomsUpdated) onRoomsUpdated(rooms);
    });

    return () => {
      socket?.off("rooms");
    };
  });
};

export const useMessages = () => {
  const [messages, setMessages] = useState([]);

  if (!socket) {
    throw new Error("Socket is not connected");
  }

  socket.on("messages", (messages) => {
    setMessages(messages);
  });

  return messages;
};

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  if (!socket) {
    throw new Error("Socket is not connected");
  }

  socket.on("users", (users) => {
    setUsers(users);
  });

  return users;
};

export const useRoomMessages = (roomId: string) => {
  const [messages, setMessages] = useState([]);

  if (!socket) {
    throw new Error("Socket is not connected");
  }

  socket.on(`room/${roomId}:messages`, (messages) => {
    setMessages(messages);
  });

  return messages;
};

export const useRoomUsers = (roomId: string) => {
  const [users, setUsers] = useState([]);

  if (!socket) {
    throw new Error("Socket is not connected");
  }

  socket.on(`room/${roomId}:users`, (users) => {
    setUsers(users);
  });

  return users;
};

export default socket;
