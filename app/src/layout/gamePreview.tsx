

import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Container, Flex, Grid, GridItem, Heading, IconButton, Image, Text, useBreakpointValue } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Games } from '../interface/game';
import { getGame } from '../api/games/gameService';
import { ArrowForwardIcon } from '@chakra-ui/icons';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function GamePreview() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });  
  const queryParams = new URLSearchParams(window.location.search);
  const [game, setGame] = useState<Games.GameData>()

  const id = queryParams.get('id');

  useEffect(() => {
    getGame(Number(id))
    .then(response => setGame(response.data))
  }, [])

  // These are the images used in the slide
  const cards = [game?.background_image, game?.background_image_additional];
  console.log(game)

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