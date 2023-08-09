import { Messages } from "@/types";
import MessageInputForm from "./MessageInputForm";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type DialogProps = {
  selectedRoom: string | null;
  connectedRoom: string | null;
  messages: Messages;
};

const Dialog = ({ selectedRoom, connectedRoom, messages }: DialogProps) => {
  return (
    <div className="grid grid-rows-[1fr_auto] border gap-1 h-full">
      <ScrollArea className="border h-full">
        <div className="border h-full">
          {messages.map((message) => (
            <div key={message.id}>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border">
        <MessageInputForm connectedRoom={connectedRoom} />
      </div>
    </div>
  );
};

export default Dialog;
