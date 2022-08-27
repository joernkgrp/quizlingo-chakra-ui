import { Link as ChakraLink, Button } from "@chakra-ui/react";

import { useRouter } from "next/router";

import { Container } from "./Container";

export const CTA = () => {
  const router = useRouter();
  const href ="https://chakra-ui.com";
  return (
    <Container
      flexDirection="row"
      position="fixed"
      bottom={0}
      width="full"
      maxWidth="3xl"
      py={3}
    >
      <Button
        onClick={() => router.push(href)}
        variant="outline"
        colorScheme="green"
        rounded="button"
        flexGrow={1}
        mx={2}
        width="full"
      >
        Komponenten anzeigen
      </Button>
      <Button
        onClick={() => router.push("/game")}
        variant="solid"
        colorScheme="green"
        rounded="button"
        flexGrow={3}
        mx={2}
        width="full"
      >
        Spiel starten
      </Button>
    </Container>
  );
};
