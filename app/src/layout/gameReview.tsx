

import React, { useEffect, useState } from 'react';
import { Box, Center, Container, Flex, Grid, GridItem, Heading, IconButton, Text, useBreakpointValue } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Games } from '../interface/game';
import { getGame } from '../api/games/gameService';

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

export default function GameReview() {
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
      <Box
        position={'relative'}
        height={{ base: '450px', md: '600px', lg: '800px' }}
        width={{ base: '420px', md: '1200px', lg: '1800px' }}
        overflow={'hidden'}>
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          colorScheme="green"
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}>
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          colorScheme="green"
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickNext()}>
          <BiRightArrowAlt />
        </IconButton>
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Flex>
              <Box
                key={index}
                height={'3xl'}
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`url(${url})`}
                rounded={20}
              />
            </Flex>
          ))}
        </Slider>
      </Box>
      <Center>
        <Heading>
          <Text as="h1" fontWeight="black" my={2} align='left'>
            <u>{game?.name}</u>
          </Text>
        </Heading>
      </Center>
      <Center>
        <Flex width={{ base: '400px', md: '400px', lg: '800px' }} bg='gray.100' rounded={10} paddingLeft={10} paddingRight={10}>
          <Text as="h1" fontWeight="hairline" my={2} align='left'>
            {game?.description_raw}
          </Text>
        </Flex>
      </Center>
    </Box>
  );
}