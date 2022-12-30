import { Box, Badge, Button, Container, Flex, IconButton, Heading, Image, Menu, MenuButton, MenuDivider, MenuList, MenuItem, Spacer, Text, Avatar, HStack, Stack } from '@chakra-ui/react'
import { useRouter } from "next/router";
import { SunIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Main } from '../components/Main'
import { GradientHeading } from '../components/GradientHeading'
import users from "../images/users.json"

export default function Room() {
    const router = useRouter();
    return (
        <Container>
            <Main>
                <Flex>
                    <Box flex="1">
                        <GradientHeading title="¡Hola, Jörn!" />
                    </Box>
                    <Menu>
                        <MenuButton as={Button} colorScheme='orange' aria-label='Menu'><HamburgerIcon /></MenuButton>
                        <MenuList>
                            <MenuItem>Profil</MenuItem>
                            <MenuItem>Einstellungen</MenuItem>
                            <MenuDivider />
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Text color="text">Wähle eine Person aus, gegen die du spielen möchtest.</Text>

                {/** <Box bg="gray.200" w="100%" p={4} borderRadius="lg">
                    ¡Disculpe! Es ist niemand von deinen Freunden online. Schaue später nochmal vorbei.
    </Box>*/ }

                <Box bg="gray.200" w="100%" p={4} borderRadius="lg">
                    <HStack spacing={3}>
                        <Avatar name='Claire Anlage' src={users[1].imageURL} size='lg' />
                        <Stack spacing={1}>
                            <Heading size="md">Claire Anlage</Heading>
                            <Text fontSize="md">Level 3</Text>
                        </Stack>
                        <Spacer />
                        <Button onClick={() => router.push("/load")} colorScheme='orange'>Jugar</Button>
                    </HStack>
                </Box>


            </Main>

        </Container >

    )
}