import { ScrollArea } from "@/components/ui/scroll-area";
import { Rooms } from "@/types";

type RoomsMenuProps = {
  rooms: Rooms;
};

const RoomsMenu = ({ rooms }: RoomsMenuProps) => {
  return (
    <div>
      <ScrollArea>
        <ul className="flex">
          {rooms.map((room) => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default RoomsMenu;
