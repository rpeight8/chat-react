import { Rooms } from "./types";
import ky from "ky";

const API_URL = "http://localhost:3000/api";
const kyInstance = ky.create({ prefixUrl: API_URL });

export const loadRooms = async () => {
  try {
    const rooms = await kyInstance.get("rooms").json<Rooms>();

    return rooms;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error("Failed to load rooms");
    }
  }
};

export const sendMessage = async (roomId: string, message: string) => {
  try {
    await kyInstance.post(`rooms/${roomId}/messages`, { json: { message } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error("Failed to send message");
    }
  }
};

export const connectToRoom = async (roomId: string) => {
  try {
    await kyInstance.post(`rooms/${roomId}/connect`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error("Failed to connect to room");
    }
  }
};

export const disconnectFromRoom = async (roomId: string) => {
  try {
    await kyInstance.post(`rooms/${roomId}/disconnect`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error("Failed to disconnect from room");
    }
  }
};
