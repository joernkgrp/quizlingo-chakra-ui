import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  VStack,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { User } from "../components/User";
import { questions } from "../data/questions";
import { Main } from "../components/Main";

const Game = () => {
  const router = useRouter();
  var [activeStep, setActiveStep] = React.useState(0);
  var [score, setScore] = useState(0);
  var maxSteps = questions.length;

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

  function checkAnswer(answerIndex) {
    var rightAnswer = questions[activeStep].correctAnswer;

    if (answerIndex === rightAnswer) {
      setScore(score + 1);
    }

    handleNext();
  }

  return (
    <Container>
      <Main>
        <Flex alignItems={"center"}>
          <User name="Tom Bola" score={score}></User>
          <Spacer />
          <Text>
            Frage {activeStep + 1} von {maxSteps}
          </Text>
        </Flex>
        <Text>{questions[activeStep].taskText}</Text>
        <Heading
          fontSize="3xl"
          bgGradient="linear(to-r, spainFlag.red, spainFlag.yellow)"
          bgClip="text"
        >
          {questions[activeStep].questionText}
        </Heading>

        {questions[activeStep].options.map((option, answerIndex) => (
          <Box
            alignItems={"top"}
            bgColor="gray.200"
            borderRadius="md"
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
