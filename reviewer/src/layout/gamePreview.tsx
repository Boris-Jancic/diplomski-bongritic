import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Heading, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import { Games } from '../interface/game';
import { getGame } from '../api/games/gameService';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export default function GamePreview() {
  const queryParams = new URLSearchParams(window.location.search);
  const [game, setGame] = useState<Games.GameData>()

  const id = queryParams.get('id');

  useEffect(() => {
    getGame(Number(id))
    .then(response => setGame(response.data))
  }, [])

  return (
    <Box>
      <Center>
          <Image src={game?.background_image} w="50%" rounded="20px" position='relative'
      borderRadius='full'/>
       </Center>
      
      <Center>
        <Heading>
          <Text as="h1" fontWeight="black" my={2} align='left'>
            <u>{game?.name}</u>
          </Text>
        </Heading>
      </Center>
      <Center marginTop={2}>
        <Flex width={{ base: '400px', md: '400px', lg: '800px' }} rounded={10} paddingLeft={10} paddingRight={10}>
          <Text as="h1" fontWeight="hairline" my={2} align='left'>
            {game?.description_raw}
          </Text>
        </Flex>
        
      </Center>

      <Center marginTop={3}>
        <Button 
          as={'a'}
          rightIcon={<ArrowForwardIcon />} 
          width='200px' 
          colorScheme='teal' 
          size='lg' 
          variant='outline' 
          color='green.500'
          fontSize={'sm'}
          fontWeight={400}
          href={`review?id=${game?.id}`}>
          Review
        </Button>
      </Center>
    </Box>
  );
}