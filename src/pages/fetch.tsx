import { useState, useEffect } from "react";

export default function Profile() {
  const [questions, setQuestions] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

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
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!questions) return <p>No profile data</p>;

  return (
    <div>
      <h1>{questions[0].id}</h1>
      <p>{questions[0].taskText}</p>
    </div>
  );
}
