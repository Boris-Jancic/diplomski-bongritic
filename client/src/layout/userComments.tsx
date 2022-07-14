import { Box, GridItem, Heading, Spinner, Text, Divider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { getUserReviews } from '../api/blogs/blogService'
import UserCard from '../components/userReviewCard';

export default function UserComments() {
  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('name');
  const [responseData, setResponseData] = useState<any>([])

  useEffect(() => {
    if(username) {
      getUserReviews(String(username)).then(response => setResponseData(response.data))
    }
  }, [username])

  return (
    <Box>
        <Heading my={5}>{username}'s comments</Heading>

        <Divider m={2}/>

        {!responseData ? <GridItem rowSpan={4}><Spinner size='xl' /></GridItem> : (
          responseData.length === 0 ?  <Text fontSize={'md'} textDecor={'underline'}>This user doesen't have any comments yet</Text> : 
            responseData.map((post: any) => {
                if (post.userComments.length > 0) return ( <UserCard key={post.userComments[0]._id} comment={post.userComments[0]} /> )
              })
          )
        }

        <Divider m={2}/>
        
    </Box>
  )
}
