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
        <Heading>{username}'s comments</Heading>

        <Divider m={2}/>
        
        {!responseData ? <Text fontSize={'md'} textDecor={'underline'}>This user doesen't have any reviews yet</Text> : (
        responseData.length === 0 ?  <GridItem rowSpan={4}><Spinner size='xl' /></GridItem> : 
            responseData.map((post: any) => {
                return ( <UserCard key={post.userComments[0]._id} comment={post.userComments[0]} /> )
                })
            )
        }

        <Divider m={2}/>
        
    </Box>
  )
}
