import { Box, Heading, Image } from '@chakra-ui/react'
import { SunIcon } from '@chakra-ui/icons'

export default function GameCard() {
    const property = {
        imageUrl: 'https://images.pexels.com/photos/54097/spain-flag-flutter-spanish-54097.jpeg?auto=compress&cs=tinysrgb&w=630&h=250&dpr=2',
        imageAlt: 'Spain flag',
        questions: 10,
        player: 0,
        title: 'Rechtschreibung & Grammatik',
        level: 2,
    }

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={property.imageUrl} alt={property.imageAlt} />

            <Box p='4'>
                <Box display='flex' alignItems='baseline'>
                    <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                    >
                        {property.questions} Fragen &bull; {property.player} Spieler online
                    </Box>
                </Box>

                <Heading
                    mt='1'
                    size="md"
                    fontWeight='medium'
                    as='h2'
                >
                    {property.title}
                </Heading>

                <Box display='flex' mt='2' alignItems='center'>
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <SunIcon
                                key={i}
                                color={i < property.level ? 'red.500' : 'gray.300'}
                            />
                        ))}
                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                        Stufe {property.level}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

