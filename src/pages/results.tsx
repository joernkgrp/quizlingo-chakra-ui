import {
  Button,
  Box,
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

import { CheckCircleIcon } from "@chakra-ui/icons";

import { useRouter } from "next/router";

import { Main } from "../components/Main";
import { User } from "../components/User";
import { GradientHeading } from "../components/GradientHeading";
import score from "./game";

const Results = () => {
  const router = useRouter();
  return (
    <Container>
      <Main>
        <GradientHeading fontSize="3xl" title="Spiel beendet" />
        <User name="Tom Bola" variant="left"></User>
        <Spacer minH={8} />

        <Heading as="h2" fontSize="lg">
          Nächste To-do’s:
        </Heading>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="orange.500" />
            Punktestand korrekt anzeigen
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="orange.500" />
            Feedback zur Antwort während des Spiels
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="orange.500" />
            Fragen aus Backend laden
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="orange.500" />
            Timer anzeigen und Zeitdauer speichern
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="orange.500" />
            Punkte nach Zeitdauer speichern
          </ListItem>
        </List>

        <Button
          onClick={() => router.push("/")}
          size="lg"
          variant="solid"
          colorScheme="orange"
          rounded="button"
          width="full"
        >
          Home
        </Button>
      </Main>
    </Container>
  );
};

export default Results;
