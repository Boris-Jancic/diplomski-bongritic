import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
  List,
  ListItem,
  Badge,
  Divider,
  Link,
  GridItem,
  Grid,
  Spinner,
  AspectRatio,
  Button,
  useDisclosure,
  ModalOverlay,
  Modal,
  FormControl,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { getCriticAverageGrade, getReviewerPost, getUserAverageGrade, postUserComment } from '../api/blogs/blogService';
import { Blog } from '../interface/post';
import { Games } from '../interface/game';
import ReviewCard from '../components/criticReviewCard';
import { getGameTrailers } from '../api/games/gameService';
import UserCard from '../components/userReviewCard';
import { useRecoilState } from 'recoil';
import { authAtom } from '../state/auth';

export default function PostView() {
  const [user, setUser] = useRecoilState(authAtom);
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  const [post, setPost] = useState<Blog.Post>()
  const [trailers, setTrailers] = useState<Array<Games.TrailerResult>>()
  const [avgCriticGrade, setAvgCriticGrade] = useState<number>(0)
  const [avgUserGrade, setAvgUserGrade] = useState<number>(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newComment, setNewComment] = useState<Blog.CreateUserComment>(
    {
      author: user.username,
      text: '',
      grade: 0,
      date: '',
      gameId: 0,
      _id: ''
    }
  );
  const toast = useToast()

  useEffect(() => { 
    getReviewerPost(String(id))
    .then(response => setPost(response.data))
  }, [id])

  useEffect(() => {
    if(post?.game) {
      newComment.gameId = post.game.id
      getGameTrailers(post.game.id)
      .then(response => response.data)
      .then((data: Games.GameMovies) => setTrailers(data.results))
      getCriticAverageGrade(String(post._id))
      .then(response => response.data)
      .then((data: any) => setAvgCriticGrade(data.criticGrade))
      getUserAverageGrade(String(post._id))
      .then(response => response.data)
      .then((data: any) => setAvgUserGrade(data.userGrade))
    }
  }, [post])
  
  const inputHandlerSlider = (grade: number) => {
    newComment.grade = grade
  }

  const textChangeHandler = (text: string) => {
    newComment.text = text 
  }

  const handleCommentSubmit = () => {
    console.log(newComment)
    postUserComment(newComment)
    .then(response => response.data)
    .then((data: any) => { 
      toast({
        title: 'Successfully posted a review',
        status: 'success',
        position: 'bottom',
        isClosable: true,
      })
      post?.userComments.push(data)
      onClose() 
    })
    .catch(error => error.response)
    .then(payload => payload.data)
    .then(data => {
      data.messages.map((msg: string)=> {
        return toast({
          title: msg,
          status: 'warning',
          position: 'bottom',
          isClosable: true,
        })
      })
    })
  }

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 1 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'game image'}
            src={post?.game?.background_image}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {post?.game?.name}
            </Heading>
          </Box>
          <Divider />
          
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('green.500', 'green.300')}
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              Game Details
            </Text>

            <Grid h='100%'
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(2, 1fr)'
              gap={10}>
                <GridItem rowSpan={1} colSpan={1}>
                  <List spacing={1} textAlign={[ 'left' ]}>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Developer: 
                      </Text>{' '}
                      {post?.game?.developers[0].name}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Publisher:
                      </Text>{' '}
                      {post?.game?.publishers[0].name}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Genres:
                      </Text>{' '}
                      {post?.game?.genres.map((item: Games.Genre) => <Badge key={item.id} colorScheme='green' mx={1}>{item.name}</Badge>)}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Platforms:
                      </Text>{' '}
                      {post?.game?.parent_platforms.map((item: Games.ParentPlatform) => <Badge key={item.platform.id} colorScheme='gray' mx={1}>{item.platform.name}</Badge>)}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Stores:
                      </Text>{' '}
                        {post?.game?.stores.map((item: Games.Store) => 
                          <Badge key={item.id} colorScheme='cyan' mx={1}>
                            <Link textDecoration={'ButtonHighlight'} href={'https://' + item.store.domain}>{item.store.name}</Link>
                          </Badge>
                        )}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Released:
                      </Text>{' '}
                      {post?.game?.released}
                    </ListItem>
                    <ListItem>
                      <Link href={post?.game?.website} fontWeight={'hairline'}>Website</Link>
                    </ListItem>
                  </List>
                </GridItem>

                <GridItem rowSpan={1} colSpan={1}>
                  <Text fontSize="sm">
                    {post?.game?.description_raw}
                  </Text>
                </GridItem>
            </Grid>
            
          </Box>
            <Heading>Trailers</Heading>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {!trailers ? <Text>Can't load trailers</Text> : (
                  trailers.length === 0 ?  <GridItem rowSpan={4}><Text>This game doesen't have any trailers that we could fetch</Text></GridItem> : 
                  trailers.map(trailer => {
                    return (
                      <GridItem>
                        <AspectRatio maxW='1000px' ratio={2}>
                          <iframe
                            title={trailer.name}
                            src={trailer.data[480]}
                            allowFullScreen
                          />
                        </AspectRatio> 
                      </GridItem>
                      )
                    })
                  )
                }
            </Grid>
          <Divider />

          <Grid h='100%'
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(2, 1fr)'
            gap={10}>
            
            <GridItem>
              <Flex alignContent='center' alignItems='center'>
                <Heading as='h3' size='lg'>
                  Critic reviews
                </Heading>

                  <Text
                    py={1}
                    px={3}
                    mx={15}
                    bg={"green.400"}
                    color="white"
                    fontSize="xl"
                    fontWeight="700"
                    rounded="md"
                  >
                    {avgCriticGrade === 0 ? <>No user grades</> : (avgCriticGrade)}
                  </Text>
              </Flex>
                {!post?.reviewerComments ? <Spinner size='xl' /> : (
                  post.reviewerComments.length === 0 ?  <GridItem rowSpan={4}><Text fontSize={'md'} textDecor={'underline'}>This game doesen't have any critic reviews yet</Text></GridItem> : 
                  post.reviewerComments.map(comment => {
                    return ( <ReviewCard key={comment._id} comment={comment} /> )
                    })
                  )
                }
            </GridItem>

            <GridItem>
              <Flex alignContent='center' alignItems='center'>
                <Heading as='h3' size='lg'>
                  User reviews
                </Heading>
                    <Text
                      py={2}
                      px={2}
                      mx={15}
                      bg="green.400"
                      color="white"
                      fontSize="xl"
                      fontWeight="700"
                      rounded="md"
                    > 
                    {avgUserGrade === 0 ? <>No user grades</> : (avgUserGrade)}
                    </Text>
                        
                  <Button
                    py={2}
                    px={2}
                    mx={5}
                    variant={'solid'}
                    colorScheme={'teal'}
                    fontSize="xl"
                    fontWeight={700}
                    rounded="md"        
                    onClick={() => {
                      onOpen()
                    }}
                  > 
                    + Add Your review
                  </Button>
                  <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    isCentered
                    size='xl'
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Add your review</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <FormControl>
                          <FormLabel>Input your comment here</FormLabel>
                          <Textarea placeholder='Comment'
                            //@ts-ignore
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => textChangeHandler(event.target.value)} />

                          <FormLabel htmlFor='grade'>Grade</FormLabel>
                          <Slider  aria-label='slider-ex-1' colorScheme='green' id='grade' defaultValue={1} min={1} max={5}
                              onChange={(value: number) => inputHandlerSlider(value)} >
                              <SliderMark value={1} mt='1' ml='-2.5' fontSize='sm'>
                                  1
                              </SliderMark>
                              <SliderMark value={2} mt='1' ml='-2.5' fontSize='sm'>
                                  2
                              </SliderMark>
                              <SliderMark value={3} mt='1' ml='-2.5' fontSize='sm'>
                                  3
                              </SliderMark>
                              <SliderMark value={4} mt='1' ml='-2.5' fontSize='sm'>
                                  4
                              </SliderMark>
                              <SliderMark value={5} mt='1' ml='-2.5' fontSize='sm'>
                                  5
                              </SliderMark>
                              <SliderTrack>
                                  <SliderFilledTrack />
                              </SliderTrack>
                              <SliderThumb color='green.900' />
                          </Slider>
                        </FormControl>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={() => handleCommentSubmit()}>
                          Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
              </Flex>

                {!post?.userComments ? <Spinner size='xl' /> : (
                  post.userComments.length === 0 ?  <GridItem rowSpan={4}><Text fontSize={'md'} textDecor={'underline'} my={10}>This game doesen't have any user reviews yet</Text></GridItem> : 
                  post.userComments.map(comment => {
                    return ( <UserCard key={comment._id} comment={comment} /> )
                    })
                  )
                }
            </GridItem>
          </Grid>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
