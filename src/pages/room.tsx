import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Spacer,
  Text,
  Avatar,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Main } from "../components/Main";
import { GradientHeading } from "../components/GradientHeading";
import users from "../images/users.json";

export default function Room() {
  const router = useRouter();
  const [game, setGame] = useState(0);
  const [showPage, setShowPage] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  // const hello = "¡Hola, " + localStorage.getItem("username");

  function joinRoom() {
    console.log("Funktion wird ausgeführt.");
    const websocket = new WebSocket(
      "wss://quizlingo-backend.herokuapp.com/websocket-game"
    );

    websocket.onopen = () => {
      websocket.send(
        JSON.stringify({
          username: localStorage.getItem("username"),
          type: "join",
        })
      );
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      console.log(event.data);
      console.log(data.canStart);
      if (data.canStart == true) {
        const users = data.players;
        if (users[0] == localStorage.getItem("username")) {
          localStorage.setItem("userP2", users[1]);
        } else {
          localStorage.setItem("userP2", users[0]);
        }
        router.push("/game");
      }
    };

    return () => {
      websocket.close();
    };
  }

  useEffect(() => {
    // Perform localStorage action
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setShowPage(true);
    }
  }, []);

  setTimeout(() => {
    setGame(1);
  }, 10000);

  return (
    <Container>
      <Main>
        <Flex>
          <Box flex="1">
            <GradientHeading title="¡Hola!" />
          </Box>
          <Menu>
            <MenuButton as={Button} colorScheme="orange" aria-label="Menu">
              <HamburgerIcon />
            </MenuButton>
            <MenuList>
              <MenuItem isDisabled>Profil</MenuItem>
              <MenuItem isDisabled>Einstellungen</MenuItem>
              <MenuDivider />
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
    </Container>
  );
}
