import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Divider,
  Flex,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { User } from "../components/User";
import { questions } from "../data/questions";
import { Main } from "../components/Main";
import { GradientHeading } from "../components/GradientHeading";
import theme from "../theme";
import users from "../images/users.json"

// Global variables to be exported
var finalScoreP1 = 0;
var finalScoreP2 = 0;

const Game = () => {
  const answerTime = 10000;
  const delay = 1000;
  const initialProgress = 100;
  const timerRefresh = 1000;

  const router = useRouter(); // Go to next page
  const toast = useToast(); // Define toast

  var maxSteps = questions.length; // Number of questions

  // Define React hooks
  var [activeStep, setActiveStep] = React.useState(0);
  var [scoreP1, setScoreP1] = useState(0);
  var [scoreP2, setScoreP2] = useState(0);
  var [comInt, setComInt] = useState(0);
  var [progress, setProgress] = useState(initialProgress);

  function getRandomInt() {
    var randomInt = Math.random();
    if (randomInt < 0.5) {
      randomInt = 0
    } else {
      randomInt = 1
    }
    setComInt(randomInt);
    console.log(comInt);
    return randomInt
  }


  // Go to next question
  function handleNext(delay) {
    setTimeout(() => {
      if (activeStep < maxSteps - 1) {
        setActiveStep(activeStep + 1);
      }

      if (activeStep == maxSteps - 1) {
        finalScoreP1 = scoreP1;
        finalScoreP2 = scoreP2;
        router.push("/results");
      }

      setProgress(initialProgress);
    }, delay);
  }

  // Toast definition
  function toastTimeout() {
    toast({
      position: "bottom",
      title: "Deine Gegnerin hat geantwortet",
      duration: delay,
      isClosable: false,
    });
  }

  // Show correct answer after timeout
  function showCorrectAnswer(delay) {
    var correctOption = questions[activeStep].correctOption;
    var correctOptionString = document.getElementById(correctOption.toString());

    // Give computer points
    setScoreP2((scoreP2 += getRandomInt()))

    toastTimeout();
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

    if (clickedOption === correctOption) {
      setScoreP1((scoreP1 += 1));
    } else {
      clickedOptionString.style.backgroundColor = theme.colors.red[500];
      clickedOptionString.style.color = theme.colors.white;
    }
  }

  // Set timer to 10 sec
  let timer;
  let timer2;

  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        showCorrectAnswer(delay);
      }, answerTime);
  };

  const progressBar = () => {
    timer2 =
      !timer2 &&
      setInterval(() => {
        setProgress((progress) => progress - answerTime / timerRefresh - 1);
      }, timerRefresh);
  };

  useEffect(() => {
    updateCount();

    return () => clearInterval(timer);
  }, [activeStep]);

  useEffect(() => {
    progressBar();

    return () => clearInterval(timer2);
  }, [progress]);

  return (
    <Container>
      <Main>
        <Flex align={"center"}>
          <User name="Tom Bola" variant="P1" avatarSrc={users[0].imageURL} score={scoreP1}></User>
          <Spacer />
          <User name="Claire Anlage" variant="P2" avatarSrc={users[1].imageURL} score={scoreP2}></User>
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
              /** _hover={{ bg: "gray.300" }} **/
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
};

export default Game;
export { finalScoreP1, finalScoreP2 };
