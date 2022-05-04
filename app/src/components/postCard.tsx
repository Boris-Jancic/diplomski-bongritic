
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
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    <Image
                    transform="scale(1)"
                    src={props.post.game?.background_image}
                    alt="some text"
                    objectFit="cover"
                    width="100%"
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
                <Heading fontSize="xl" marginTop="2">
                <Text as="h6" fontSize="lg" marginTop="2" color='cadetblue'>
                    {props.post.game?.name}
                </Text>
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    {props.post.title}
                </Link>
                </Heading>
                <Text as="p" fontSize="md" marginTop="2" noOfLines={3}>
                    {props.post.text}
                </Text>
                <BlogAuthor
                    name={props.post.author}
                    avatar={props.post.avatar}
                    date={new Date(props.post.createdAt)}
                />
            </Box>
            </WrapItem>
        </Wrap>
    )
}
