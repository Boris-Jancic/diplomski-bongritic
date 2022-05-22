import { Box, GridItem, Heading, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { getCriticReviews } from '../api/blogs/blogService'
import ReviewCard from '../components/reviewCard';
import { Blog } from '../interface/post';

export default function ReviewerComments() {
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get('name');
  const email = queryParams.get('email');
  const [responseData, setResponseData] = useState<any>([])

  useEffect(() => {
      getCriticReviews(String(email)).then(response => setResponseData(response.data))
  }, [])

  console.log(responseData)

  return (
    <Box>
      <Heading as='h3' size='lg'><i>{name}'s</i> reviews</Heading>
      {!responseData ? <Text fontSize={'md'} textDecor={'underline'}>This game doesen't have any critic reviews yet</Text> : (
        responseData.length == 0 ?  <GridItem rowSpan={4}><Spinner size='xl' /></GridItem> : 
        responseData.map((post: any) => {
          console.log(post)
            return ( <ReviewCard key={post.reviewerComments[0]._id} comment={post.reviewerComments[0]} /> )
          })
        )
      }
    </Box>
  )
}
