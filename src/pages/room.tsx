// Imports
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Main } from "../components/Main";
import { GradientHeading } from "../components/GradientHeading";

// Global variables to be exported
var userName1 = "";
var userName2 = "";

export default function Room() {
  const router = useRouter();
  const [sayHello, setSayHello] = useState("");

  // Perform logout
  function logout() {
    sessionStorage.removeItem("token");
    router.push("/");
  }

  // React effects
  useEffect(() => {
    // Perform sessionStorage action
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      // Show username on page
      var userNameWrong = sessionStorage.getItem("username");
      var userName = userNameWrong.replace(/"/g, "");
      setSayHello("¡Hola, " + userName + "!");
    }
  }, []);

  function joinRoom() {
    const websocket = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket-game"
    );

    websocket.onopen = () => {
      websocket.send(
        JSON.stringify({
          username: sessionStorage.getItem("username"),
          type: "join",
        })
      );
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.canStart == true) {
        const users = data.players;
        if (users[0] == sessionStorage.getItem("username")) {
          sessionStorage.setItem("userP2", users[1]);
          userName1 = users[0].replace(/"/g, "");
          userName2 = users[1].replace(/"/g, "");
        } else {
          sessionStorage.setItem("userP2", users[0]);
          userName2 = users[0].replace(/"/g, "");
          userName1 = users[1].replace(/"/g, "");
        }
        router.push("/fetch");
      }
    };

    return () => {
      websocket.close();
    };
  }

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Main>
          <Flex>
            <Box flex="1">
              <GradientHeading title={sayHello} />
            </Box>
            <Menu>
              <MenuButton as={Button} colorScheme="orange" aria-label="Menu">
                <HamburgerIcon />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => logout()}>Ausloggen</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Text color="text">
            Wähle eine Person aus, gegen die du spielen möchtest.
          </Text>
          <Button colorScheme="orange" onClick={() => joinRoom()}>
            Neues Spiel
          </Button>
        </Main>
      </motion.div>
    </Container>
  );
}

export { userName1, userName2 };
