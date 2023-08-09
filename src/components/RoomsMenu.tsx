import { ScrollArea } from "@/components/ui/scroll-area";
import { Rooms } from "@/types";
import { Button } from "./ui/button";

type RoomsMenuProps = {
  rooms: Rooms;
  selectedRoom: string | null;
  connectedRoom: string | null;
  onRoomSelect(roomId: string): void;
};

const RoomsMenu = ({
  rooms,
  selectedRoom,
  connectedRoom,
  onRoomSelect,
}: RoomsMenuProps) => {
  return (
    <div className="border">
      <h2>Rooms</h2>
      <ScrollArea>
        <ul className="grid">
          {rooms.map((room) => (
            <li key={room.id}>
              <Button
                variant={selectedRoom === room.id ? "secondary" : "ghost"}
                onClick={() => {
                  onRoomSelect(room.id);
                }}
              >
                {room.name}
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default RoomsMenu;
