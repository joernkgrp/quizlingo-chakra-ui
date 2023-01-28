import * as React from "react";

export default function useWebSockets() {
  React.useEffect(() => {
    const websocket = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket-native"
    );

    websocket.onopen = () => {
      alert("Connection established");
      websocket.send(
        JSON.stringify({ username: "joern", selectedAnswer: 1, questionId: 1 })
      );
    };

    websocket.onmessage = (event) => {
      const data = event.data;
      alert(`[message] Data received from server: ${data}`);
    };

    return () => {
      websocket.close();
    };
  }, []);

  return <h1>Hallo</h1>;
}
