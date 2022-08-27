import {
  Button,
  Container,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Heading,
  Text,
  VStack,
  Spacer,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { Main } from "../components/Main";
import { User } from "../components/User";
import score from "./game";

const Results = () => {
  const router = useRouter();
  return (
    <Container>
      <Main height={"100vh"}>
        <Heading
          fontSize="3xl"
          bgGradient="linear(to-r, spainFlag.red, spainFlag.yellow)"
          bgClip="text"
        >
          Spiel beendet
        </Heading>
        <User name="Tom Bola"></User>

        <Text>Nächste To-dos:</Text>
        <UnorderedList>
          <ListItem>Punktestand korrekt anzeigen</ListItem>
          <ListItem>Feedback zur Antwort während des Spiels</ListItem>
          <ListItem>Fragen aus Backend laden</ListItem>
          <ListItem>Timer anzeigen und Zeitdauer speichern</ListItem>
          <ListItem>Punkte nach Zeitdauer speichern</ListItem>
        </UnorderedList>
        <Spacer />
        <Button
          onClick={() => router.push("/")}
          size="lg"
          variant="solid"
          colorScheme="orange"
          rounded="button"
          mx={2}
          width="full"
        >
          Home
        </Button>
      </Main>
    </Container>
  );
};

export default Results;
