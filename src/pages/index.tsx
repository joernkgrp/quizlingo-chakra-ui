import {
  Button,
  Box,
  Link as ChakraLink,
  Container,
  Heading,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { Main } from "../components/Main";

const Index = () => {
  const router = useRouter();
  return (
    <Container>
      <Main>
        <Heading
          fontSize="6xl"
          bgGradient="linear(to-r, spainFlag.red, spainFlag.yellow)"
          bgClip="text"
        >
          Quizlingo
        </Heading>
        <Text color="text">
          Spanish learning quiz made in <Code>Next.js</Code> +{" "}
          <Code>chakra-ui</Code> + <Code>TypeScript</Code>.
        </Text>

        <List spacing={3} my={0} color="text">
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://chakra-ui.com"
              flexGrow={1}
              mr={2}
            >
              Chakra UI <LinkIcon />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://nextjs.org"
              flexGrow={1}
              mr={2}
            >
              Next.js <LinkIcon />
            </ChakraLink>
          </ListItem>
        </List>
        <Button
          onClick={() => router.push("/game")}
          size="lg"
          variant="solid"
          colorScheme="orange"
          rounded="button"
          width="full"
        >
          Spiel starten
        </Button>
      </Main>
    </Container>
  );
};

export default Index;
