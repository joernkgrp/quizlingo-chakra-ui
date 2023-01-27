import React from "react";
import useWebSocket from "react-use-websocket";
import { useState, useEffect } from "react";

const WS_URL = "wss://quizlingo-backend.herokuapp.com/websocket";

function App() {
  const [price, setPrice] = useState("");

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket("wss://quizlingo-backend.herokuapp.com/websocket", {
    onOpen: () => console.log("opened"),
    shouldReconnect: (closeEvent) => true,
  });

  return <div>Hello WebSockets!</div>;
}

export default App;
