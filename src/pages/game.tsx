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

const Game = () => {
  const router = useRouter(); // Go to next page

  var maxSteps = questions.length; // Number of questions

  // Define React hooks
  var [activeStep, setActiveStep] = React.useState(0);
  var [score, setScore] = useState(0);
  const [progress, setProgress] = React.useState(100);

  const toast = useToast(); // Define toast

  // Toast for correct and wrong given answer
  function ToastResponse(correct: boolean) {
    if (correct) {
      toast({
        position: "bottom",
        title: "¡Correcto!",
        status: "success",
        duration: 1000,
        isClosable: false,
      });
    } else {
      toast({
        position: "bottom",
        title: "¡Incorrecto!",
        status: "error",
        duration: 1000,
        isClosable: false,
      });
    }
  }

  // Toast for timeout
  function ToastTimeout() {
    toast({
      position: "bottom",
      title: "Zeit schon abgelaufen!",
      status: "error",
      duration: 1000,
      isClosable: false,
    });
  }

  // Go to next question
  function handleNext(delay) {
    setTimeout(() => {
      if (activeStep < maxSteps - 1) {
        setProgress(100);
        setActiveStep(activeStep + 1);
      }

      if (activeStep == maxSteps - 1) {
        finalScore = score;
        router.push("/results");
      }
    }, delay);
  }

  // Show correct answer after timeout
  function showCorrectAnswer() {
    setProgress(0.1);
    var correctOption = questions[activeStep].correctOption;
    var correctOptionString = document.getElementById(correctOption.toString());

    correctOptionString.style.backgroundColor = theme.colors.green[500];
    correctOptionString.style.color = theme.colors.white;

    setTimeout(() => {
      correctOptionString.style.backgroundColor = theme.colors.gray[200];
      correctOptionString.style.color = theme.colors.gray[800];
    }, 3000);
    setProgress(100);
  }

  // Check given answer
  function checkAnswer(clickedOption) {
    setProgress(0);
    var correctOption = questions[activeStep].correctOption;
    var clickedOptionString = document.getElementById(clickedOption.toString());
    var correctOptionString = document.getElementById(correctOption.toString());

    correctOptionString.style.backgroundColor = theme.colors.green[500];
    correctOptionString.style.color = theme.colors.white;

    setTimeout(() => {
      setCheck((check) => !check);
      clickedOptionString.style.backgroundColor = theme.colors.gray[200];
      clickedOptionString.style.color = theme.colors.gray[800];
      correctOptionString.style.backgroundColor = theme.colors.gray[200];
      correctOptionString.style.color = theme.colors.gray[800];
      setProgress(100);
    }, 1000);

    if (clickedOption === correctOption) {
      if (progress <= 0) {
        ToastTimeout();
      }
      if (progress > 0) {
        setScore((score += 1));
        ToastResponse(true);
      }
    } else {
      clickedOptionString.style.backgroundColor = theme.colors.red[500];
      clickedOptionString.style.color = theme.colors.white;

      ToastResponse(false);
    }
    handleNext(1000);
    setCheck((check) => !check);
    setNewScale(1);
  }

  // Set timer to 10 sec

  let timer;
  const [check, setCheck] = useState(true);
  const [newScale, setNewScale] = useState(1);

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        if (activeStep == maxSteps - 1) {
          router.push("/results");
        } else {
          setActiveStep((activeStep) => activeStep + 1);
        }
      }, 10000);

    if (activeStep === maxSteps - 2) clearInterval(timer);
  };

  const updateWidth = () => {
    setInterval(() => {
      setNewScale((newScale) => newScale - 0.2);
    }, 1000);

    if (newScale === 0) clearInterval(timer);
  };

  useEffect(() => {
    updateCount();
    updateWidth();

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
              style={{ originX: 0,}}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10*5, ease: "linear"}}
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
              transition="0.2s ease-out"
            >
              <Text fontSize={"lg"}>{option}</Text>
            </Box>
          ))}

          {/** <Button
          isDisabled={activeStep > 0 ? false : true}
          leftIcon={<ArrowBackIcon />}
          colorScheme="orange"
          variant="outline"
          onClick={handlePrevious}
        >
          Vorherige Frage
        </Button> **/}
        </Main>
      </motion.div>
    </Container>
  );
};

export default Game;
export { finalScore };
