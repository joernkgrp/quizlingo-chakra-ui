import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import {
  Box,
  Container,
  Divider,
  Flex,
  Spacer,
  Progress,
  Text,
  useToast,
} from "@chakra-ui/react";
import { User } from "../components/User";
import { questions } from "../data/questions";
import { Main } from "../components/Main";
import { GradientHeading } from "../components/GradientHeading";
import theme from "../theme";

var finalScore = 0; // Global variable to be exported
const delay = 1500; // Set delay to 1.5 s
const answerTime = 10000;

const Game = () => {
  const router = useRouter(); // Go to next page
  const toast = useToast(); // Define toast

  var maxSteps = questions.length; // Number of questions

  // Define React hooks
  var [activeStep, setActiveStep] = React.useState(0);
  var [score, setScore] = useState(0);

  // Go to next question
  function handleNext(delay) {
    setTimeout(() => {
      if (activeStep < maxSteps - 1) {
        setActiveStep(activeStep + 1);
      }

      if (activeStep == maxSteps - 1) {
        finalScore = score;
        router.push("/results");
      }
    }, delay);
  }

  // Toast definition
  function toastTimeout() {
    toast({
      position: "bottom",
      title: "Zeit abgelaufen!",
      status: "error",
      duration: 1500,
      isClosable: false,
    });
  }

  // Show correct answer after timeout
  function showCorrectAnswer(delay) {
    toastTimeout();
    var correctOption = questions[activeStep].correctOption;
    var correctOptionString = document.getElementById(correctOption.toString());

    correctOptionString.style.backgroundColor = theme.colors.green[500];
    correctOptionString.style.color = theme.colors.white;

    setTimeout(() => {
      correctOptionString.style.backgroundColor = theme.colors.gray[200];
      correctOptionString.style.color = theme.colors.gray[800];
    }, delay);

    handleNext(delay);
  }

  // Check given answer
  function checkAnswer(clickedOption) {
    var correctOption = questions[activeStep].correctOption;
    var clickedOptionString = document.getElementById(clickedOption.toString());
    var correctOptionString = document.getElementById(correctOption.toString());

    // Change color to green for correct answer
    correctOptionString.style.backgroundColor = theme.colors.green[500];
    correctOptionString.style.color = theme.colors.white;

    setTimeout(() => {
      clickedOptionString.style.backgroundColor = theme.colors.gray[200];
      clickedOptionString.style.color = theme.colors.gray[800];
      correctOptionString.style.backgroundColor = theme.colors.gray[200];
      correctOptionString.style.color = theme.colors.gray[800];
    }, delay);

    if (clickedOption === correctOption) {
      setScore(score + 1);
    } else {
      clickedOptionString.style.backgroundColor = theme.colors.red[500];
      clickedOptionString.style.color = theme.colors.white;
    }
    handleNext(delay);
  }

  // Set timer to 10 sec
  let timer;

  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        showCorrectAnswer(delay);
      }, answerTime);
  };

  useEffect(() => {
    updateCount();

    return () => clearInterval(timer);
  }, [activeStep]);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Main>
          <Flex align={"center"}>
            <Text fontSize="lg" fontWeight={"semibold"}>
              Pregunta {activeStep + 1} de {maxSteps}
            </Text>

            <Spacer />

            <User name="Tom Bola" variant="right" score={score}></User>
          </Flex>

          <div className="wrapper">
            <motion.div
              style={{ originX: 0 }}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: (answerTime / 1000) * 5, ease: "linear" }}
              className="box"
            />
            <motion.div animate={{ width: "100%" }} className="boxBackground" />
          </div>

          <Divider />

          <Text fontSize={"lg"}>{questions[activeStep].taskText}</Text>

          <GradientHeading
            fontSize="3xl"
            title={questions[activeStep].questionText}
          />

          {questions[activeStep].options.map((option, optionIndex) => (
            <Box
              bgColor="gray.200"
              borderRadius="lg"
              p={4}
              id={optionIndex.toString()}
              /** _hover={{ bg: "gray.300" }} **/
              onClick={() => checkAnswer(optionIndex)}
              cursor="pointer"
              transition="0.25s ease-out"
            >
              <Text fontSize={"lg"}>{option}</Text>
            </Box>
          ))}
        </Main>
      </motion.div>
    </Container>
  );
};

export default Game;
export { finalScore };
