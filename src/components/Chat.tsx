import { useRooms } from "@/hooks/useRooms";
import Dialog from "./Dialog";
import RoomsMenu from "./RoomsMenu";
import { useOnRoomsUpdated } from "@/socket";
import { loadRooms } from "@/services";
import { useState } from "react";
import { Rooms } from "@/types";

const Chat = () => {
  const [rooms, setRooms] = useState<Rooms>([]);
  useOnRoomsUpdated(() => {
    loadRooms().then((rooms) => {
      setRooms(rooms);
    });
  });

  return (
    <div className="grid grid-cols-[200px_1fr] w-full h-full">
      <RoomsMenu rooms={rooms} />
      <Dialog />
    </div>
  );
};
export default Chat;
