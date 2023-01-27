import React from "react";
import useWebSocket from "react-use-websocket";

const WS_URL = "wss://quizlingo-backend.herokuapp.com/websocket";

function App() {
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  return <div>Hello WebSockets!</div>;
}

export default App;
