import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react";

import { useRouter } from "next/router";

import { User } from "../components/User";
import score from "./game";

const Results = () => {
  const router = useRouter();
  return (
    <Container>
      <VStack spacing={6} my={6} align="stretch">
        <Heading
          fontSize="3xl"
          bgGradient="linear(to-r, spainFlag.red, spainFlag.yellow)"
          bgClip="text"
        >
          Ergebnis
        </Heading>
        <User name="Tom Bola"></User>
        <Text>To do: Punktestand korrekt importieren</Text>
        <Text>{score}</Text>
        <Button onClick={() => router.push("/")}>Home</Button>
      </VStack>
    </Container>
  );
};

export default Results;
