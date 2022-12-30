import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  Button,
  Container,
  Text,
  Spacer,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { Main } from "../components/Main";
import { User } from "../components/User";
import { GradientHeading } from "../components/GradientHeading";
import { finalScoreP1, finalScoreP2 } from "./game";
import users from "../images/users.json"

function GameAssessment() {
  if (finalScoreP1 > finalScoreP2) {
    return <Text fontSize="lg">Has genado, ¡Felicidades!</Text>;
  } else if (finalScoreP1 == finalScoreP2) {
    return <Text fontSize="lg">¡Es un empat!</Text>;
  } else if (finalScoreP1 < finalScoreP2) {
    return (
      <Text fontSize="lg">¡Has perdido! Lástima.</Text>
    );
  }
}

const Results = () => {
  const router = useRouter();

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Main>
          <GradientHeading fontSize="3xl" title="Spiel beendet" />

          <HStack>
            <User name="Tom Bola" score={finalScoreP1} avatarSrc={users[0].imageURL} variant="P1"></User>
            <Spacer />
            <User name="Claire Anlage" score={finalScoreP2} avatarSrc={users[1].imageURL} variant="P2"></User>
          </HStack>
          <GameAssessment />

          <Spacer minH={8} />

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
      </motion.div>
    </Container>
  );
};

export default Results;
