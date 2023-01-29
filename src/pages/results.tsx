// Imports
import React, { useEffect } from "react";
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
import { userName1, userName2 } from "./room";

function GameAssessment() {
  if (finalScoreP1 > finalScoreP2) {
    return <Text fontSize="lg">Has genado, ¡Felicidades!</Text>;
  } else if (finalScoreP1 == finalScoreP2) {
    return <Text fontSize="lg">¡Es un empat!</Text>;
  } else if (finalScoreP1 < finalScoreP2) {
    return <Text fontSize="lg">¡Has perdido! Lástima.</Text>;
  }
}

const Results = () => {
  const router = useRouter();

  // React effects
  useEffect(() => {
    // Perform sessionStorage action
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Main>
          <GradientHeading fontSize="3xl" title="Spiel beendet" />
          {/* Show results of both users */}
          <HStack>
            <User name={userName1} score={finalScoreP1} variant="P1"></User>
            <Spacer />
            <User name={userName2} score={finalScoreP2} variant="P2"></User>
          </HStack>
          <GameAssessment />

          <Spacer minH={8} />

          <Button
            onClick={() => router.push("/room")}
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
