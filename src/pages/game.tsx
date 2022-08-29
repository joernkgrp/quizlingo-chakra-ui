import React, { useState } from "react";
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

  // Set timer to 10 sec
  function startTimer() {
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress < 0) {
            return 0;
          }
          const diff = 0.1;
          var returnTime = Math.min(oldProgress - diff, 100);
          console.log(returnTime);

          return returnTime;
        });
      }, 10);

      return () => {
        clearInterval(timer);
      };
    }, []);
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
    var correctOption = questions[activeStep].correctOption;
    var correctOptionString = document.getElementById(correctOption.toString());

    correctOptionString.style.backgroundColor = theme.colors.green[500];
    correctOptionString.style.color = theme.colors.white;

    setTimeout(() => {
      correctOptionString.style.backgroundColor = theme.colors.gray[200];
      correctOptionString.style.color = theme.colors.gray[800];
      setProgress(100);
    }, 1000);

    handleNext(1000);
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
  }

  // Start timer after loading page
  startTimer();

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y:10 }}
        animate={{ opacity: 1, y:0}}
        transition={{duration:0.5}}
      >
        <Main>
          <Flex align={"center"}>
            <Text fontSize="lg" fontWeight={"semibold"}>
              Pregunta {activeStep + 1} de {maxSteps}
            </Text>

            <Spacer />
            <User name="Tom Bola" variant="right" score={score}></User>
          </Flex>

          <Progress borderRadius={"lg"} value={progress} />

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
