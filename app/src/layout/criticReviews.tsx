import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  useColorModeValue,
  Container,
  VStack,
  SimpleGrid,
  Spinner,
  Stack,
  Badge,
} from '@chakra-ui/react';
import { TokenService } from '../api/client/tokenService';
import { Blog } from '../interface/post';
import PostCard from '../components/postCard';
import Paginator from '../components/pagination';
import { getLatestReviewerPost, getReviewerPosts } from '../api/blogs/blogService';
import { Games } from '../interface/game';


export const BlogTags: React.FC<Blog.IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="green" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export const BlogAuthor: React.FC<Blog.BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={props.avatar}
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const CriticReviews = () => {
  const [game, setGame] = useState<Games.GameData>()
  const [latestPost, setLatestPost] = useState<Blog.Post>({
      author: {
          email: '',
          name: '',
          avatar: '',
      },
      title: '',
      text: '',
      game: game,
      grade: 1,
      avatar: '',
      createdAt: '',
      comments: []
      }
    )
  const [postResponse, setPostResponse] = useState<Blog.PostResponse>({
        totalPages: 1,
        currentPage: 1,
        posts: []
  })

  useEffect(() => {
    getReviewerPosts()
    .then((res: any)=> setPostResponse(res.data))
    getLatestReviewerPost()
    .then((res:any) => setLatestPost(res.data))
  }, [])
  

  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1">LATEST REVIEW</Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={latestPost.game?.background_image}
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(green.600 1px, transparent 1px)',
                'radial(green.300 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <Stack direction='row' marginTop="2">
            {latestPost?.game?.genres.map((item: Games.Genre) => <Badge colorScheme='green'>{item.name}</Badge>)}
          </Stack>
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {latestPost.title}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
              {latestPost.text}
          </Text>
          <BlogAuthor name={latestPost.author.name} date={new Date(latestPost.createdAt)} avatar={latestPost.author.avatar} /> 
        </Box>
      </Box>
      <Heading as="h2" marginTop="5">
        Other reviews
      </Heading> 
      <Divider marginTop="5" />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacingX={6}>
        {postResponse.posts.length < 1 ? <Spinner size='xl' /> : (
          postResponse.posts?.map(data => {
            return ( <PostCard post={data} /> )
            })
          )
        }
      </SimpleGrid>

      <Paginator />
      
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">What we write about</Heading>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack>
    </Container>
  );
};

export default CriticReviews;