import MessageInputForm from "./MessageInputForm";

type DialogProps = {
  selectedRoom: string | null;
};

const Dialog = ({ selectedRoom }: DialogProps) => {
  return (
    <div className="grid grid-rows-[1fr_auto] border gap-1">
      <div className="border">messages</div>
      <div className="border">
        <MessageInputForm selectedRoom={selectedRoom} />
      </div>
    </div>
  );
};

export default Dialog;
