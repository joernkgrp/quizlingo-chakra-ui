import React, { useState, useEffect } from "react";
import Component from "../components/LoginButton";
import { questions } from "../data/questions";

export default function Login() {
  interface Question {
    id: number;
    category: string;
    taskText: string;
    questionsText: string;
    terms: string[];
    type: any;
    options: string[];
    correctOption: number;
  }

  // const [questions, setQuestions] = useState([]);

  const endpoint = "https://quizlingo-backend.herokuapp.com/questions";

  const options = {
    method: "GET", // GET because sending data
    headers: {
      "Content-Type": "application/json", // Inform server we send a JSON
      Authorization:
        "Bearer " + localStorage.getItem("token").replace(/['"]+/g, ""),
      Accept: "*/*",
    },
  };

  useEffect(() => {
    fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("data:");
        console.log(data);
        console.log("questions:");
        console.log(questions);
        return questions;
      });
  }, []);

  return (
    <>
      <h1>Spiel</h1>
      <br />
      {questions[0].taskText}
      <br />
      {questions[0].questionText}
      A: B: C: D:
      <button>A</button>
      <button>B</button>
      <button>C</button>
      <button>D</button>
    </>
  );
}
