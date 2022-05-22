
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  SimpleGrid,
  Badge,
  Stack,
} from '@chakra-ui/react';
import React from 'react'
import { Games } from '../interface/game';
import { Blog } from '../interface/post';
import { BlogAuthor, BlogTags } from '../layout/criticReviews'

export default function PostCard(props: {post: Blog.Post}) {
    return (
        <Wrap spacing="30px" marginTop="5">
            <WrapItem >
            <Box w="100%">
                <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" href={`/post/view?id=${props.post._id}`} _hover={{ textDecoration: 'none' }}>
                    <Image
                    transform="scale(1)"
                    src={props.post.game?.background_image}
                    alt="some text"
                    objectFit="scale-down"
                    width={400}
                    height={250}
                    borderRadius='full'
                    transition="0.3s ease-in-out"
                    _hover={{
                        transform: 'scale(1.05)',
                    }}
                    />
                </Link>
                </Box>
                <Stack direction='row' marginTop="2">
                    {props.post.game?.genres.map((item: Games.Genre) => <Badge colorScheme='green'>{item.name}</Badge>)}
                </Stack>
                <Heading fontSize="x-large" marginTop="2">
                    <Text color='cadetblue'>
                        {props.post.game?.name}
                    </Text>
                </Heading>
                <Divider width={"50%"} m={5} />
                <BlogAuthor
                    name={props.post.reviewerComments.at(-1)?.author}
                    email={props.post.reviewerComments.at(-1)?.authorEmail}
                    avatar={props.post.reviewerComments.at(-1)?.avatar}
                    date={new Date(String(props.post.reviewerComments.at(-1)?.date))}
                />
            </Box>
            </WrapItem>
        </Wrap>
    )
}
