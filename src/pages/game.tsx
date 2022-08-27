import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Container,
  Divider,
  Flex,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { User } from "../components/User";
import { questions } from "../data/questions";
import { Main } from "../components/Main";
import { GradientHeading } from "../components/GradientHeading";
import theme from "../theme";

var finalScore = 0;

const Game = () => {
  const router = useRouter();
  var [activeStep, setActiveStep] = React.useState(0);
  var [score, setScore] = useState(0);
  var maxSteps = questions.length;

  const toast = useToast();

  function handleNext() {
    setTimeout(() => {
      if (activeStep < maxSteps - 1) {
        setActiveStep(activeStep + 1);
      }

      if (activeStep == maxSteps - 1) {
        finalScore = score;
        router.push("/results");
      }
    }, 1000);
  }

  function handlePrevious() {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  }

  function ToastExample(correct: boolean) {
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

  function checkAnswer(clickedOption) {
    var correctOption = questions[activeStep].correctOption;
    var clickedOptionString = document.getElementById(clickedOption.toString());
    var correctOptionString = document.getElementById(correctOption.toString());

    correctOptionString.style.backgroundColor = theme.colors.green[500];
    correctOptionString.style.color = theme.colors.white;

    setTimeout(() => {
      clickedOptionString.style.backgroundColor = theme.colors.gray[200];
      correctOptionString.style.backgroundColor = theme.colors.gray[200];
      clickedOptionString.style.color = theme.colors.gray[800];
      correctOptionString.style.color = theme.colors.gray[800];
    }, 1000);

    if (clickedOption === correctOption) {
      setScore((score += 1));
      ToastExample(true);
    } else {
      clickedOptionString.style.backgroundColor = theme.colors.red[500];
      clickedOptionString.style.color = theme.colors.white;
      ToastExample(false);
    }
    handleNext();
  }

  return (
    <Container>
      <Main>
        <Flex align={"center"}>
          <Text fontSize="lg" fontWeight={"semibold"}>
            Pregunta {activeStep + 1} de {maxSteps}
          </Text>
          <Spacer />
          <User name="Tom Bola" variant="right" score={score}></User>
        </Flex>

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
    </Container>
  );
};

export default Game;
export { finalScore };
