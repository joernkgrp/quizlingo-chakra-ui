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

const loadingText1 = "Fragen werden geladen …";
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
        const diff = Math.random() * 0.4;
        return Math.min(oldProgress + diff, 100);
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Stack height={"100vh"} alignItems={"center"} justifyContent="center">
      <Box width={"80vw"} pb={2}>
        <Progress
          size="sm"
          hasStripe
          value={progress}
          colorScheme="orange"
          borderRadius={"lg"}
        />
      </Box>

      <motion.div
        animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 0.95] }}
        transition={{ duration: 5, times: [0,0.2, 0.8, 1], ease: "easeOut", }}
      >
        <GradientHeading>Hallo</GradientHeading>
        <Flex
          width={"100vw"}
          justifyContent="center"
          alignItems="center"
          bgGradient="linear(to-r, spainFlag.red, spainFlag.yellow)"
          bgClip="text"
        >
          <Heading fontSize="3xl">{loadingText1}</Heading>
          {/* <Heading fontSize="3xl">{progress > 50 && loadingText2}</Heading> */}
        </Flex>
      </motion.div>
    </Stack>
  );
}

export default Load;
