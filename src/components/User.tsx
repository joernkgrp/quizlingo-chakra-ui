import { Avatar, Text, HStack } from "@chakra-ui/react";

export const User = ({
  name,
  score,
  variant,
}: {
  name: string;
  score: number;
  variant: string;
}) => {
  return variant === "P1" ? (
    <>
      <HStack align={"center"} spacing={4}>
        <Text fontSize="2xl" as="b">
          {score}
        </Text>
        <Text>{name}</Text>
      </HStack>
    </>
  ) : (
    <>
      <HStack align={"center"} spacing={4}>
        <Text>{name}</Text>
        <Text fontSize="2xl" as="b">
          {score}
        </Text>
      </HStack>
    </>
  );
};

User.defaultProps = {
  name: "Dan Abramov",
  score: 0,
};
