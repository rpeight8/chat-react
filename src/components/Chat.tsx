import Dialog from "./Dialog";
import RoomsMenu from "./RoomsMenu";
import { useMessages, useOnRoomsUpdated } from "@/socket";
import { connectToRoom, disconnectFromRoom, loadRooms } from "@/services";
import { useEffect, useState } from "react";
import { Messages, Rooms } from "@/types";

const Chat = () => {
  const [connectedRoom, setConnectedRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Messages>([]); // [message, message, message]
  const [rooms, setRooms] = useState<Rooms>([]);

  useOnRoomsUpdated(() => {
    loadRooms().then((rooms) => {
      setRooms(rooms ?? []);
    });
  });

  useMessages(connectedRoom, (newMessages) =>
    setMessages(messages.concat(newMessages))
  );

  useEffect(() => {
    if (!selectedRoom || connectedRoom === selectedRoom) {
      return;
    }

    const connect = async (selectedRoom: string) => {
      await connectToRoom(selectedRoom);
      setConnectedRoom(selectedRoom);
    };

    connect(selectedRoom);

    return () => {
      if (connectedRoom) {
        disconnectFromRoom(connectedRoom);
      }
    };
  }, [connectedRoom, selectedRoom]);

  return (
    <div className="grid grid-cols-[200px_1fr] gap-1 w-full h-full border p-2">
      <RoomsMenu
        rooms={rooms}
        onRoomSelect={setSelectedRoom}
        connectedRoom={connectedRoom}
        selectedRoom={selectedRoom}
      />
      <Dialog
        selectedRoom={selectedRoom}
        connectedRoom={connectedRoom}
        messages={messages}
      />
    </div>
  );
};
export default Chat;
