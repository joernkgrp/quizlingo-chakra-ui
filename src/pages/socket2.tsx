import React, { useState, useEffect } from "react";

export default function Home(props) {
  const [data, setData] = useState(props.data);
  const [ws, setWS] = useState(null);
  useEffect(() => {
    const newWS = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket"
    );
    newWS.onerror = (err) => console.error(err);
    newWS.onopen = () => setWS(newWS);
    newWS.onmessage = (msg) => setData(JSON.parse(msg.data));
  }, []);
  return (
    <div>
      <div>
        <title>OSS Docs</title>
        <meta
          name="description"
          content="Fast like SSR, Powerful like WebSockets"
        />
        <link rel="icon" href="/favicon.ico" />
      </div>

      <div>
        <h1>{props.title || "Untitled Document"}</h1>
        <div>Data is: {JSON.stringify(data)}</div>
      </div>
    </div>
  );
}
