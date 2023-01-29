import { useState, useEffect } from "react";
import { useRouter } from "next/router";

var takeQuestions = [];

export default function Profile() {
  const [questions, setQuestions] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const router = useRouter(); // Go to next page

  function checkResponse() {
    console.log(questions[0].id);
  }

  const options = {
    method: "GET", // GET because sending data
    headers: {
      "Content-Type": "application/json", // Inform server we send a JSON
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dGVzdCIsImV4cCI6MTY3NTAzMjA4OCwiaWF0IjoxNjc1MDE0MDg4fQ.siD3R2Ffrt0iK1Vuky3o4AYaM6N3INcwlXJ4ZrXZVpQoItaOgPfpwXR5xIb88iwhzuIPb0ZnIkiD_JY5CUkFvA",
      Accept: "*/*",
    },
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://quizlingo-backend.herokuapp.com/questions", options)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
        console.log("Bin bei Fetch");
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!questions) return <p>No profile data</p>;

  if (isLoading == false) {
    takeQuestions = questions;

    console.log(takeQuestions);
    router.push("/game");
  }

  return (
    <div>
      <h1>{questions[0].id}</h1>
      <button onClick={() => checkResponse()}>Hallo</button>
      <p>{questions[0].taskText}</p>
    </div>
  );
}

export { takeQuestions };
