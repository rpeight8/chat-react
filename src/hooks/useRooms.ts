import { Rooms } from "@/types";
import { useEffect, useState } from "react";

export const useRooms = (loadRooms: boolean) => {
  const [rooms, setRooms] = useState<Rooms>([]);

  useEffect(() => {
    if (loadRooms) {
      loadRooms().then((rooms: Rooms) => setRooms(rooms));
    }
  }, []);

  return rooms;
};
