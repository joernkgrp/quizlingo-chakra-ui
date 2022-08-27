import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export const User = ({
  name,
  score,
  variant,
}: {
  name: string;
  score: number;
  variant: string;
}) => {
  return variant === "left" ? (
    <>
      <HStack align={"center"}>
        <Avatar size="lg" name="Dan Abramov" src="https://bit.ly/dan-abramov" />
        <VStack spacing="0" align={"left"}>
          <Text fontSize="md">{name}</Text>
          <Text fontSize="xl" as="b">
            {score}
          </Text>
        </VStack>
      </HStack>
    </>
  ) : (
    <>
      <HStack align={"center"}>
        <VStack spacing="0" align={"end"}>
          <Text fontSize="md">{name}</Text>
          <Text fontSize="xl" as="b">
            {score}
          </Text>
        </VStack>
        <Avatar size="lg" name="Dan Abramov" src="https://bit.ly/dan-abramov" />
      </HStack>
    </>
  );
};

User.defaultProps = {
  name: "Dan Abramov",
  score: 0,
};
