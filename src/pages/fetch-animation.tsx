// Imports
import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Flex, Progress, Stack, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useRouter } from "next/router";

var takeQuestions = [];

const loadingHeading1 = "Das Spiel wird gestartet …";
const loadingHeading2 = "Mache dich bereit. Es geht los!";

export default function Load() {
  const router = useRouter(); // Go to next page
  const [questions, setQuestions] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [progress, setProgress] = React.useState(0);
  const animationTime = 6;

  // Websocket options
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

        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            return Math.min(oldProgress + 1 / animationTime, 100);
          });
        }, 10);

        setLoading(false);
        return () => {
          clearInterval(timer);
        };
      });
  }, []);

  if (isLoading == false) {
    takeQuestions = questions;
    router.push("/game");
  }

  if (isLoading) return <p>Loading...</p>;
  if (!questions) return <p>No profile data</p>;

  return (
    <Stack height={"100vh"} alignItems={"center"} justifyContent="center">
      <motion.div
        animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }}
        transition={{ duration: animationTime, ease: "easeOut" }}
      >
        <Flex
          width={"100vw"}
          justifyContent="center"
          alignItems="center"
          bgGradient="linear(to-r, spainFlag.red, spainFlag.yellow)"
          bgClip="text"
        >
          <Heading fontSize="2xl">
            {progress < 50 ? loadingHeading1 : loadingHeading2}
          </Heading>
        </Flex>
      </motion.div>
      <Box width={"90vw"} pt={2}>
        <Progress
          size="sm"
          hasStripe
          value={progress}
          colorScheme="orange"
          borderRadius={"lg"}
        />
      </Box>
    </Stack>
  );
}

export { takeQuestions };
