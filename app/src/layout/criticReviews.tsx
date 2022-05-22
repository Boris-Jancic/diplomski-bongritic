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
      <Link href={`/critic/reviews?name=${props.name}&email=${props.email}`} fontSize="md">{props.name}</Link>
      <Text>—</Text>
      <Text>{props.date?.toLocaleDateString()}</Text>
    </HStack>
  );
};

const CriticReviews = () => {
  const [game, setGame] = useState<Games.GameData>()
  const [latestPost, setLatestPost] = useState<Blog.Post>({
      _id: '',
      game: game,
      grade: 1,
      avatar: '',
      createdAt: '',
      reviewerComments: [],
      userComments: []
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
  
  console.log(postResponse.posts)

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
              {latestPost.game?.name}
            </Link>
          </Heading>
          <BlogAuthor name={latestPost.reviewerComments.at(-1)?.author} date={new Date(String(latestPost.reviewerComments.at(-1)?.date))} avatar={latestPost.reviewerComments.at(-1)?.avatar} /> 
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
          Gaming and writing don’t have much in common, do they?
          But, if you take a closer look, you’ll see the bond that ties the two.
          Our team hasn’t seen the bond that ties gaming and writing until the couple of us at Bongritic have realized that we love writing down notes and reviews of the games we played.
          Some were fascinated by the intricacies behind the development, some were awed by the stories, while some fell in love with the designs, and as you can imagine, the list goes on.
          It’s this exact passion for games and spending hours talking and writing about them that’s been the starting point of our team–without it, nothing would be worth it.
        </Text>
      </VStack>
    </Container>
  );
};

export default CriticReviews;