import { Avatar, Text, HStack } from "@chakra-ui/react";

export const User = ({
  name,
  avatarSrc,
  score,
  variant,
}: {
  name: string;
  avatarSrc: any;
  score: number;
  variant: string;
}) => {
  return variant === "P1" ? (
    <>
      <HStack align={"center"}>
        <Avatar size="lg" name={name} src={avatarSrc} />
        <Text>{name}</Text>
        <Text fontSize="2xl" as="b">
          {score}
        </Text>
      </HStack>
    </>
  ) : (
    <>
      <HStack align={"center"}>
        <Text fontSize="2xl" as="b">
          {score}
        </Text>
        <Text>{name}</Text>
        <Avatar size="lg" name={name} src={avatarSrc} />
      </HStack>
    </>
  );
};

User.defaultProps = {
  name: "Dan Abramov",
  score: 0,
};
