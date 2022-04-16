import {
  Flex,
  Box,
  Image,
  Badge,
  Stack,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { Games } from '../interface/game';

function GameCard(props: any) {
  return (      
    <Flex>
      <LinkBox w="400px" rounded="20px" 
           overflow="hidden" mt={10}>
        <Image src={props.background_image}
               alt="Card Image">
        </Image>
        <Box p={5}>
          <Stack direction='row'>
            {props.platforms?.map((item: Games.Platform) => <Badge variant='outline'>{item.platform.name}</Badge>)}
          </Stack>
          <LinkOverlay href={`/games/review?id=${props.id}`} >
            <Text as="h2" fontWeight="semibold" my={2} align='left'>
            {props.name}
            </Text>
          </LinkOverlay>
          <Text as="h5" fontWeight="hairline" my={2} align='left'>
          Release date: {props.released}
          </Text>
          <Stack direction='row'>
            {props.genres?.map((item: Games.Genre) => <Badge colorScheme='green'>{item.name}</Badge>)}
          </Stack>
        </Box>
      </LinkBox>
    </Flex>
  );
}

export default GameCard;