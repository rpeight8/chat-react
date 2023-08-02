import { Rooms } from "./types";

export const loadRooms = async () => {
  const response = await fetch("http://localhost:3000/api/rooms");
  // TODO: add schema validation
  const data = (await response.json()) as Rooms;
  console.log(data);
  return data;
};
