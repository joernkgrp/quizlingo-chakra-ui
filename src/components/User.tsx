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
        <Avatar size="lg" name={name} src={avatarSrc} />
      </HStack>
    </>
  );
};

User.defaultProps = {
  name: "Dan Abramov",
  score: 0,
};
