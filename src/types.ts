export type Room = {
  id: string;
  name: string;
};

export type Rooms = Room[];

export type Message = {
  id: string;
  content: string;
  userId: string;
  roomId: string;
  createdAt: string;
};

export type Messages = Message[];
