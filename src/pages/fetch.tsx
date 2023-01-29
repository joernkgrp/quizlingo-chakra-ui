// Imports
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

var takeQuestions = [];

export default function Fetch() {
  const [questions, setQuestions] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter(); // Go to next page

  useEffect(() => {
    var tokenWrong = sessionStorage.getItem("token");
    var token = tokenWrong.replace(/"/g, "");

    // Websocket options
    const options = {
      method: "GET", // GET because sending data
      headers: {
        "Content-Type": "application/json", // Inform server we send a JSON
        Authorization: "Bearer " + token,
        Accept: "*/*",
      },
    };
    setLoading(true);
    fetch("https://quizlingo-backend.herokuapp.com/questions", options)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!questions) return <p>No profile data</p>;

  if (isLoading == false) {
    takeQuestions = questions;
    router.push("/game");
  }
}

export { takeQuestions };
