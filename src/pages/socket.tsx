import React, { useState, useEffect } from "react";

export default function useWebSockets() {
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");

  React.useEffect(() => {
    const websocket = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket-native"
    );

    websocket.onopen = () => {
      setStatus("Connection established");
      websocket.send(
        JSON.stringify({
          username: "joern",
          selectedAnswer: 1,
          questionId: 5,
          currentScore: 0,
        })
      );
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setUserName(data.username);
      setStatus("falsch");
    };

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <div>
      <h1>Hallo</h1>
      <div>{status}</div>
      <div>{userName} hat eine Antwort geschickt.</div>
      <div>Die Antwort war {status}</div>
    </div>
  );
}
