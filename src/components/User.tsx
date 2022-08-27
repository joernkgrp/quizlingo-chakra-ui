import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export const User = ({ name, score }: { name: string; score: number; }) => (
  <HStack align={"center"}>
    <Avatar size="lg" name="Dan Abramov" src="https://bit.ly/dan-abramov" />
    <VStack spacing="0" align={"left"}>
      <Text fontSize="md">{name}</Text>
      <Text fontSize="xl" as='b'>{score}</Text>
    </VStack>
  </HStack>
);

User.defaultProps = {
  name: "Dan Abramov",
  score: 0,
};
