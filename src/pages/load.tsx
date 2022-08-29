import React, { useState } from "react";
import {
  Box,
  Flex,
  Container,
  Progress,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useRouter } from "next/router";
import { GradientHeading } from "../components/GradientHeading";

const loadingText1 = "Das Spiel wird gestartet …";
const loadingText2 = "Mache dich bereit. Es geht los!";

function Load() {
  const router = useRouter();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          router.push("/game");
          return 100;
        }
        const diff = Math.random() * 0.2;
        return Math.min(oldProgress + 0.2, 100);
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Stack height={"100vh"} alignItems={"center"} justifyContent="center">
      <motion.div
        animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 0.95] }}
        transition={{ duration: 5, times: [0, 0.2, 0.9, 1], ease: "easeOut" }}
      >
        <Flex
          width={"100vw"}
          justifyContent="center"
          alignItems="center"
          bgGradient="linear(to-r, spainFlag.red, spainFlag.yellow)"
          bgClip="text"
        >
          <Heading fontSize="2xl">
            {progress < 50 ? loadingText1 : loadingText2}
          </Heading>
          {/* <Heading fontSize="3xl">{progress > 50 && loadingText2}</Heading> */}
        </Flex>
      </motion.div>
      <Box width={"90vw"} pt={2}>
        <Progress
          size="sm"
          hasStripe
          value={progress}
          colorScheme="orange"
          borderRadius={"lg"}
        />
      </Box>
    </Stack>
  );
}

export default Load;
