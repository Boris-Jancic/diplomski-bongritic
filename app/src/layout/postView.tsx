import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Avatar,
  Badge,
  Divider,
  Link,
  GridItem,
  Grid,
  Spinner,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import React, { useEffect, useState } from 'react'
import { getReviewerPost } from '../api/blogs/blogService';
import { Blog } from '../interface/post';
import { Games } from '../interface/game';
import { BlogAuthor } from './criticReviews';
import ReviewCard from '../components/reviewCard';

export default function PostView() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  const [post, setPost] = useState<Blog.Post>()

  useEffect(() => { 
    getReviewerPost(String(id))
    .then(response => setPost(response.data))
  }, [])

  console.log(post)

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
                <GridItem>
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
                      {post?.game?.genres.map((item: Games.Genre) => <Badge key={item.id} colorScheme='green'>{item.name}</Badge>)}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Platforms:
                      </Text>{' '}
                      {post?.game?.parent_platforms.map((item: Games.ParentPlatform) => <Badge key={item.platform.id} colorScheme='gray'>{item.platform.name}</Badge>)}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Stores:
                      </Text>{' '}
                        {post?.game?.stores.map((item: Games.Store) => <Badge key={item.id} colorScheme='cyan'>
                        <Link textDecoration={'ButtonHighlight'} href={'https://' + item.store.domain}>{item.store.name}</Link>
                        </Badge>)}
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
                <GridItem>
                  <Text fontSize="sm">
                    {post?.game?.description_raw}
                  </Text>
                </GridItem>
            </Grid>
            
          </Box>
          <Divider />

          <Grid h='100%'
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(2, 1fr)'
            gap={10}>
            
            <GridItem>
              <Heading as='h3' size='lg'>
                Critic reviews
                {!post?.reviewerComments ? <Spinner size='xl' /> : (
                  post?.reviewerComments.map(comment => {
                    return ( <ReviewCard comment={comment} /> )
                    })
                  )
                }
              </Heading>
            </GridItem>

            <GridItem>
              <Heading as='h3' size='lg'>
                Users reviews
              </Heading>
            </GridItem>
          </Grid>
          {/* <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'md'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Leave a comment
          </Button> */}

          {/* <Stack direction="row" alignItems="center" justifyContent={'center'}>
        <BlogAuthor
            name={post?.author.name}
            avatar={post?.author.avatar}
            date={new Date(String(post?.createdAt))} />
          </Stack> */}
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
