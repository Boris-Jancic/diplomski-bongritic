import { Box, GridItem, Heading, Spinner, Text, Image, Flex, Divider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { getCriticReviews, getReviewer } from '../api/blogs/blogService'
import ReviewCard from '../components/criticReviewCard';
import { Blog } from '../interface/post';

export default function ReviewerComments() {
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get('email');
  const [responseData, setResponseData] = useState<any>([])
  const [reviewer, setReviewer] = useState<Blog.Reviewer>()

  useEffect(() => {
    if(email) {
      getCriticReviews(String(email)).then(response => setResponseData(response.data))
      getReviewer(String(email)).then(res => res.data).then(data => setReviewer(data))
    }
  }, [email])

  console.log(reviewer)

  return (
    <Box>
      <Flex alignItems="center"  my={30} w={500}>
          <Image
            mx={4}
            w={75}
            h={75}
            rounded="full"
            src={reviewer?.avatar} 
          />
        <Heading as='h1' size='lg'><i>{reviewer?.username}</i> - {reviewer?.firstName} {reviewer?.lastName} </Heading>
      </Flex>


      <Flex w={{sm:'95%', md:'80', lg:750}} p={25} alignItems="center">
        {/* Add reviewer biography here */}
        <Text fontSize="sm"  textAlign={'left'}> {reviewer?.biography} </Text> 
      </Flex>

      <Heading textAlign={'right'} as='h6' size='sm'>Registered since: {reviewer === undefined ? <Spinner size='xl' /> : new Date(reviewer.createdAt).toLocaleString()} </Heading>

      <Divider my={15} />
      <Heading as='h4' size='lg'>{reviewer?.username}'s comments</Heading>
      
      {!responseData ? <Text fontSize={'md'} textDecor={'underline'}>This game doesen't have any critic reviews yet</Text> : (
        responseData.length === 0 ?  <GridItem rowSpan={4}><Spinner size='xl' /></GridItem> : 
        responseData.map((post: any) => {
          console.log(post)
            return ( <ReviewCard key={post.reviewerComments[0]._id} comment={post.reviewerComments[0]} /> )
          })
        )
      }
    </Box>
  )
}
