import {
  Button,
  Box,
  Container,
  List,
  ListItem,
  ListIcon,
  Heading,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";

import { CheckCircleIcon } from "@chakra-ui/icons";

import { useRouter } from "next/router";

import { Main } from "../components/Main";
import { User } from "../components/User";
import { GradientHeading } from "../components/GradientHeading";
import { finalScore } from "./game";

function GameAssessment(props) {
  if (props.finalScore == 5) {
    return <Text fontSize="lg">¡Fantástico! Besser geht es nicht mehr.</Text>;
  } else if (props.finalScore > 2) {
    return <Text fontSize="lg">Das war schon richtig bueno.</Text>;
  } else {
    return (
      <Text fontSize="lg">Beim nächsten Mal wird es bestimmt besser.</Text>
    );
  }
}

const Results = () => {
  const router = useRouter();

  return (
    <Container>
      <Main>
        <GradientHeading fontSize="3xl" title="Spiel beendet" />
        <Divider />

        <User name="Tom Bola" score={finalScore} variant="left"></User>
        <GameAssessment finalScore={finalScore} />

        <Spacer minH={8} />

        <Heading as="h2" fontSize="lg">
          Nächste To-do’s:
        </Heading>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="orange.500" />
            Fragen aus Backend laden
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="orange.500" />
            Punkte abhängig nach benötigter Zeit berechnen
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="orange.500" />
            Login und Registrierung
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
          Zur Startseite
        </Button>
      </Main>
    </Container>
  );
};

export default Results;
