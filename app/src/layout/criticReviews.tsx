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
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';
import { Blog } from '../interface/post';
import PostCard from '../components/postCard';
import Paginator from '../components/pagination';
import { getLatestReviewerPost, getPosts, getPostsByGame } from '../api/blogs/blogService';
import { Games } from '../interface/game';
import { debounce } from 'lodash';

export const BlogAuthor: React.FC<Blog.BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="30px"
        src={props.avatar}
        alt={`Avatar of ${props.name}`}
      />
      <Text fontSize="xs">
        Last reviewed by <Link href={`/critic/reviews?name=${props.name}&email=${props.email}`}><b>{props.name}</b></Link> {props.date?.toLocaleDateString()}
      </Text>
    </HStack>
  );
};

const CriticReviews = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [createdAt, setCreatedAt] = useState(1)
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
    getPosts(1, 6, -1)
    .then((res: any)=> setPostResponse(res.data))
    getLatestReviewerPost()
    .then((res: any) => setLatestPost(res.data))
  }, [])
  
  useEffect(() => {
  }, [currentPage, totalPages])

  useEffect(() => {
    getPosts(1, 6, createdAt)
    .then((res: any)=> setPostResponse(res.data))
  }, [createdAt])

  const debouncedSearch = debounce(async (criteria: string) => {
    if (criteria === "") { getPosts(1, 5, createdAt).then((res: any)=> setPostResponse(res.data)) }
    else getPostsByGame(1, 5, criteria).then((response) => response.data).then((data: any) => setPostResponse(data))
  }, 500);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  }

  const handleCreatedAtChange = async () => {
    if (createdAt === -1) setCreatedAt(1); else setCreatedAt (-1)
  }

  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1" marginBottom={100}>LATEST REVIEW</Heading>
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
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }} href={`/post/view?id=${latestPost._id}`}>
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
            {latestPost?.game?.genres.map((item: Games.Genre) => <Badge key={item.id} colorScheme='green'>{item.name}</Badge>)}
          </Stack>
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {latestPost.game?.name}
            </Link>
          </Heading>
          <BlogAuthor name={latestPost.reviewerComments.at(-1)?.author} date={new Date(String(latestPost.reviewerComments.at(-1)?.date))} avatar={latestPost.reviewerComments.at(-1)?.avatar} /> 
        </Box>
      </Box>
      <Divider marginTop={100} />
      <Heading as="h2" marginTop={5}>
        Other reviews
      </Heading>
      <Text mb='8px'>Search by game</Text>
      <Flex alignContent='center' alignItems='center'>
        <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
            placeholder='Game name'
            size='sm'
        />
        <Button colorScheme='teal' size='sm' mx={5} px={50} onClick={() => handleCreatedAtChange()} >
          {createdAt !== -1 ? <>Sort by new</> : <>Sort by old</>}
          </Button>
      </Flex>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacingX={6}>
        {postResponse.posts.length < 1 ? <Spinner size='xl' /> : (
          postResponse.posts?.map(data => {
            return ( <PostCard key={data._id} post={data} /> )
            })
          )
        }
      </SimpleGrid>

      <Paginator currentPage={currentPage} totalPages={10} setCurrentPage={setCurrentPage} />
      
      <VStack paddingTop="40px" my={50} alignItems="flex-start">
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