import * as React from "react";

export default function useWebSockets() {
  React.useEffect(() => {
    const websocket = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket"
    );

    websocket.onopen = () => {
      var msg = { user: "joern" };
      alert("Connection established");
      websocket.send(JSON.stringify(msg));
      console.log(JSON.stringify(msg));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      alert(`[message] Data received from server: ${event.data}`);
    };

    return () => {
      websocket.close();
    };
  }, []);

  return <h1>Hallo</h1>;
}
