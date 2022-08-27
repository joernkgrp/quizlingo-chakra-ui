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

const Game = () => {
  const router = useRouter();
  var [activeStep, setActiveStep] = React.useState(0);
  var [score, setScore] = useState(0);
  var maxSteps = questions.length;

  const toast = useToast();

  function handleNext() {
    if (activeStep < maxSteps - 1) {
      setActiveStep(activeStep + 1);
    }

    if (activeStep == maxSteps - 1) {
      router.push("/results");
    }
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
        duration: 2000,
        isClosable: false,
      });
    } else {
      toast({
        position: "bottom",
        title: "¡Incorrecto!",
        status: "warning",
        duration: 2000,
        isClosable: false,
      });
    }
  }

  function checkAnswer(answerIndex) {
    var rightAnswer = questions[activeStep].correctAnswer;

    if (answerIndex === rightAnswer) {
      setScore(score + 1);
      ToastExample(true);
    } else {
      ToastExample(false);
    }

    handleNext();
  }

  return (
    <Container>
      <Main>
        <Flex align={"center"}>
          <Text>
            {" "}
            Pregunta {activeStep + 1} de {maxSteps}
          </Text>
          <Spacer />
          <User name="Tom Bola" variant="right" score={score}></User>
        </Flex>


        <Divider />

        <Text>{questions[activeStep].taskText}</Text>

        <GradientHeading
          fontSize="3xl"
          title={questions[activeStep].questionText}
        />

        {questions[activeStep].options.map((option, answerIndex) => (
          <Box
            bgColor="gray.200"
            borderRadius="lg"
            p={4}
            _hover={{ bg: "gray.300" }}
            onClick={() => checkAnswer(answerIndex)}
            cursor="pointer"
          >
            <Text>{option}</Text>
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
