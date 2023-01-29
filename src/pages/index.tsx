// Imports
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  Button,
  Link,
  Container,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Main } from "../components/Main";
import { GradientHeading } from "../components/GradientHeading";

export default function Index() {
  const router = useRouter();

  // Check if logged in
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/room");
    }
  }, []);

  return (
    <Container>
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Main>
          <GradientHeading fontSize="6xl" title="Quizlingo" />

          <Text color="text">
            Spanisch lernen im spielerischen Duell mit <br />
            <Code>Spring</Code> + <Code>Java</Code> + <Code>Next.js</Code> +{" "}
            <Code>Chakra UI</Code> + <Code>TypeScript</Code>.
          </Text>

          <List spacing={3} my={0} color="text">
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <Link isExternal href="https://spring.io/" flexGrow={1} mr={2}>
                Spring <LinkIcon />
              </Link>
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <Link isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
                Next.js <LinkIcon />
              </Link>
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <Link isExternal href="https://chakra-ui.com" flexGrow={1} mr={2}>
                Chakra UI <LinkIcon />
              </Link>
            </ListItem>
          </List>

          <Button
            onClick={() => router.push("/login")}
            size="lg"
            variant="solid"
            colorScheme="orange"
            rounded="button"
            width="full"
          >
            Einloggen
          </Button>

          <Text align={"center"}>
            Noch kein Quizlingo-User?{" "}
            <Link onClick={() => router.push("/register")} color={"orange.500"}>
              Registrieren
            </Link>
          </Text>
        </Main>
      </motion.div>
    </Container>
  );
}
