import { useEffect, useState } from "react";

import "./App.css";
import { useSocket } from "./socket";
import Chat from "./components/Chat";

function App() {
  const { isConnecting, isError } = useSocket();

  if (isConnecting) {
    return <div>Connecting...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return <Chat />;
}

export default App;
