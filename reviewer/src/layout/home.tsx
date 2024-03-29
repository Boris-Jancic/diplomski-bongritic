import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import TatooedGamer from '../images/tatooedGamer.jpg'

export default function Home() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              color={'darkcyan'}>
              Game reviewing
            </Text>
            <br />
            <Text color={'green.400'} as={'span'}>
              Made easy
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Never miss a game review. Never be indecisive when purchasing a game,
            we don't do paid game reviews.
            Keep track of your reviews and view others.
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          rounded={10}
          src={TatooedGamer}
        />
      </Flex>
    </Stack>
  );
}