import Dialog from "./Dialog";
import RoomsMenu from "./RoomsMenu";
import { useOnRoomsUpdated } from "@/socket";
import { loadRooms } from "@/services";
import { useState } from "react";
import { Rooms } from "@/types";

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Rooms>([]);
  useOnRoomsUpdated(() => {
    loadRooms().then((rooms) => {
      setRooms(rooms ?? []);
    });
  });

  return (
    <div className="grid grid-cols-[200px_1fr] gap-1 w-full h-full border p-2">
      <RoomsMenu
        rooms={rooms}
        onRoomSelect={setSelectedRoom}
        selectedRoom={selectedRoom}
      />
      <Dialog selectedRoom={selectedRoom} />
    </div>
  );
};
export default Chat;
