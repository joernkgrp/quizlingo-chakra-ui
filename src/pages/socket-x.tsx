import React, { useState, useEffect } from "react";

export default function useWebSockets() {
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");
  const [buttonNumber, setButtonNumber] = useState(1);

  React.useEffect(() => {
    const websocket = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket-answer"
    );

    websocket.onopen = () => {
      setStatus("Connection established");
    };

    if (buttonNumber == 0) {
      websocket.send(
        JSON.stringify({
          username: "joern",
          selectedAnswer: 0,
          questionId: 5,
          currentScore: 0,
        })
      );
    }

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
      <button id="1" onClick={() => setButtonNumber(0)}>
        A
      </button>
      <button>B</button>
      <button>C</button>
      <button>D</button>
      <div>{status}</div>
      <div>{userName} hat eine Antwort geschickt.</div>
      <div>Die Antwort war {status}</div>
    </div>
  );
}
