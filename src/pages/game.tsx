// Imports
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Box, Container, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { User } from "../components/User";
import { Main } from "../components/Main";
import { GradientHeading } from "../components/GradientHeading";
import theme from "../theme";
import { userName1, userName2 } from "./room";
import { takeQuestions as questions } from "./fetch";

// Global variables to be exported
var finalScoreP1 = 0;
var finalScoreP2 = 0;

export default function Game() {
  const router = useRouter(); // Go to next page
  const answerTime = 10000;
  const delay = 1000;
  const initialProgress = 100;
  const timerRefresh = 1000;

  // Define React hooks
  var [activeStep, setActiveStep] = useState(0);
  var [scoreP1, setScoreP1] = useState(0);
  var [scoreP2, setScoreP2] = useState(0);
  var [progress, setProgress] = useState(initialProgress);

  // Set timer to 10 sec
  let timer;
  let timer2;

  // React effects
  useEffect(() => {
    // Perform sessionStorage action
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
    // Fetch again if question object is empty
    if (!questions) {
      router.push("/fetch");
    }
  }, []);

  // Function that shows correct answer when time is over
  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        showCorrectAnswer(delay);
      }, answerTime);
  };

  // Function to show progress bar
  const progressBar = () => {
    timer2 =
      !timer2 &&
      setInterval(() => {
        setProgress((progress) => progress - answerTime / timerRefresh - 1);
      }, timerRefresh);
  };

  useEffect(() => {
    // Websocket connection
    const websocket = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket-answer"
    );

    // Make assignment from websocket data to scores
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.username == userName1) {
        setScoreP1(data.totalScore);
        finalScoreP1 = data.totalScore;
      } else {
        setScoreP2(data.totalScore);
        finalScoreP2 = data.totalScore;
      }
    };

    return () => {
      websocket.close();
    };
  }, []);

  // Update question when time is over
  useEffect(() => {
    updateCount();

    return () => clearInterval(timer);
  }, [activeStep]);

  useEffect(() => {
    progressBar();

    return () => clearInterval(timer2);
  }, [progress]);

  // Go to next question
  function handleNext(delay) {
    setTimeout(() => {
      if (activeStep < maxSteps - 1) {
        setActiveStep(activeStep + 1);
      }

      if (activeStep == maxSteps - 1) {
        router.push("/results");
      }

      setProgress(initialProgress);
    }, delay);
  }

  var maxSteps = questions.length; // Number of questions

  // Show correct answer after timeout
  function showCorrectAnswer(delay) {
    var correctOption = questions[activeStep].correctOption;
    var correctOptionString = document.getElementById(correctOption.toString());

    // correctOptionString.style.backgroundColor = theme.colors.green[500];
    // correctOptionString.style.color = theme.colors.white;

    setTimeout(() => {
      correctOptionString.style.backgroundColor = theme.colors.gray[200];
      correctOptionString.style.color = theme.colors.gray[800];
      handleNext(0);
    }, delay * 2);
  }

  // Check given response
  function checkResponse(clickedOption) {
    setProgress(0);

    const websocket = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket-answer"
    );

    setTimeout(() => {
      websocket.send(
        JSON.stringify({
          username: userName1,
          selectedAnswer: clickedOption,
          questionId: questions[activeStep].id,
          currentScore: scoreP1,
        })
      );
    }, 1000);

    // Define clicked and correct options
    var correctOption = questions[activeStep].correctOption;
    var clickedOptionString = document.getElementById(clickedOption.toString());
    var correctOptionString = document.getElementById(correctOption.toString());

    // Change color to green for correct answer
    correctOptionString.style.backgroundColor = theme.colors.green[500];
    correctOptionString.style.color = theme.colors.white;

    // Colorize answers
    setTimeout(() => {
      clickedOptionString.style.backgroundColor = theme.colors.gray[200];
      clickedOptionString.style.color = theme.colors.gray[800];
      correctOptionString.style.backgroundColor = theme.colors.gray[200];
      correctOptionString.style.color = theme.colors.gray[800];
      //handleNext(0);
    }, delay * 2);

    if (clickedOption !== correctOption) {
      clickedOptionString.style.backgroundColor = theme.colors.red[500];
      clickedOptionString.style.color = theme.colors.white;
    }
  }

  return (
    <Container>
      <Main>
        <Flex align={"center"}>
          <User name={userName1} variant="P1" score={scoreP1}></User>
          <Spacer />
          <User name={userName2} variant="P2" score={scoreP2}></User>
        </Flex>

        <div className="wrapper">
          <motion.div
            style={{ originX: 0 }}
            animate={{ width: progress + "%" }}
            transition={{ ease: "easeInOut" }}
            className="box"
          />
          <motion.div animate={{ width: "100%" }} className="boxBackground" />
        </div>

        <Stack spacing={1}>
          <Text fontSize="lg" fontWeight={"semibold"}>
            Pregunta {activeStep + 1} de {maxSteps}
          </Text>
          <Text fontSize={"lg"}>{questions[activeStep].taskText}</Text>
        </Stack>
        <GradientHeading
          fontSize="2xl"
          title={questions[activeStep].questionText}
        />

        <Stack spacing={4}>
          {questions[activeStep].options.map((option, optionIndex) => (
            <Box
              bgColor="gray.200"
              borderRadius="lg"
              p={3}
              id={optionIndex.toString()}
              onClick={() => checkResponse(optionIndex)}
              cursor="pointer"
              transition="0.25s ease-out"
            >
              <Text fontSize={"lg"}>{option}</Text>
            </Box>
          ))}
        </Stack>
      </Main>
    </Container>
  );
}

export { finalScoreP1, finalScoreP2 };
