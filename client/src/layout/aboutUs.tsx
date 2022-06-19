import { Box, Container, Divider, Flex, Heading, HStack, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import XboxJoystick from '../images/xboxjoystick.jpg'
import Gamer from '../images/gamer.jpg'
import SmallGamer from '../images/smallGamer.jpg'
import Keyboard from '../images/keyboard.jpg'

export default function AboutUs() {
  return (
    <Box my={15}  px={{base:'5%', md: '10%', lg: '15%' }}  textAlign='left'>
        <Heading my={25} >Who we are and how we came to be</Heading>
        
        <Divider color="green.400" />
        
        <SimpleGrid columns={{base:1, md: 1, lg: 2 }} my={25} borderWidth='1px' rounded={40} >
          <Text p={5} alignSelf='center'>At first glance, gaming and writing don’t have much in common, do they? But, if you take a closer look, you’ll see the bond that ties the two.  Our team hasn’t seen the bond that ties gaming and writing until the couple of us at <b>Bongritic</b> have realized that we love writing down notes and reviews of the games we played.</Text>
          <Image 
            src={Keyboard} 
            p={5}
            borderRadius='full'
            alignSelf='center' />
        </SimpleGrid>

        <Divider />

        <SimpleGrid columns={{base:1, md: 2, lg: 2 }} my={25} borderWidth='1px' rounded={40} >
            <Image 
            src={SmallGamer} 
            p={5}
            rounded={10}
            borderRadius='full'
            alignSelf='center' />
            <Text p={5} alignSelf='center'>Some were fascinated by the intricacies behind the development, some were awed by the stories, while some fell in love with the designs, and as you can imagine, the list goes on. It’s this exact passion for games and spending hours talking and writing about them that’s been the starting point of our team–without it, nothing would be worth it.
              Over at <b>Bongritic</b>, we do our work out of love for games. Nothing brings us more joy than finding out how this or that game has been developed, then playing it for hours on end, and writing stuff down so we can share our findings with the world. That’s why you’ll notice that we don’t do advertised reviews. If faith says so, money will come with time, and until then, we’ll keep doing what we’re the best at: playing and reviewing games!</Text>
        </SimpleGrid>

        <Divider />

        <SimpleGrid columns={{base:1, md: 2, lg: 2 }} my={25} borderWidth='1px' rounded={40} >
            <Text p={5} alignSelf='center'>Our team consists of people with various passions, which we think is the key to our success. Having multiple people with different opinions is a perfect recipe for a productive brainstorming session. That’s why, in the plethora of our articles, you’ll notice a vast range of review perspectives, writing styles, etc.
              We’ve also come up with a unique scoring system, which helps us combine our multiple voices. This allows us to be fair to all studios and lets us be unbiased.</Text>
            <Image 
              src={Gamer} 
              p={5}
              rounded={10}
              borderRadius='full'
              alignSelf='center' />
        </SimpleGrid>

        <Divider />

        <Text my={50} textDecor='aliceblue'> Now, as far as introductions go, I think it’s time to put a stop to this one so we can let you go ahead and read some of our reviews! So go ahead and check out what we’re all about, you’re going to love it! </Text>
    </Box>
  )
}
