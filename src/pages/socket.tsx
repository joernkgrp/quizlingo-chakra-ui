import React, { useState, useEffect } from "react";

export default function useWebSockets() {
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");

  React.useEffect(() => {
    const websocket = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket-answer"
    );

    websocket.onopen = () => {
      setStatus("Connection established");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setUserName(data.username);
    };

    return () => {
      websocket.close();
    };
  }, []);

  function checkAnswer(value) {
    const websocket = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket-answer"
    );

    setTimeout(() => {
      websocket.send(
        JSON.stringify({
          username: "joern",
          selectedAnswer: value,
          questionId: 5,
          currentScore: 0,
        })
      );
    }, 3000);
  }

  return (
    <div>
      <h1>Hallo</h1>
      <button onClick={() => checkAnswer(0)}>A</button>
      <br />
      <button onClick={() => checkAnswer(1)}>B</button>
      <br />
      <button onClick={() => checkAnswer(2)}>C</button>
      <br />
      <button onClick={() => checkAnswer(3)}>D</button>
      <br />
      <button>D</button>
      <div>{status}</div>
      <br />
      <div>{userName} hat eine Antwort geschickt.</div>
    </div>
  );
}
