import { useEffect, useState } from "react";

import "./App.css";
import socket from "./socket";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [helloEvents, setHelloEvents] = useState<string[]>([]);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onHelloEvent(value: string) {
      setHelloEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHelloEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onHelloEvent);
    };
  }, [isConnected]);
  console.log(helloEvents);
  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {helloEvents.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
