import { Box, Container, Divider, FormLabel, Heading, HStack, SimpleGrid, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getTotalUsers } from '../api/clients/clientService'
import { getTotalReviewers } from '../api/reviewers/reviewerService'
import BoxedInfo from '../components/boxedInfo'
import { BestReviewerGamesPieChart } from '../components/charts/bestRatedReviewerGames'

export default function Statistics() {
    const [reviewerData, setReviewerData] = useState<any>({})
    const [userData, setdataData] = useState<any>({})

    useEffect(() => {
      getTotalReviewers().then(res => setReviewerData(res.data))
      getTotalUsers().then(res => setdataData(res.data))
    }, [])
    
  return (
    <Container maxW={'2xl'}>
        <FormLabel>Reviewers</FormLabel>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacingX={6}  textAlign='center' justifyContent='' alignContent='center' alignItems='center'>
         {!reviewerData ? <Spinner size='xl' /> : (
                <HStack>
                    <BoxedInfo title={'Total'} text={reviewerData.total} />
                    <BoxedInfo title={'Approved'} text={reviewerData.approved} />
                    <BoxedInfo title={'Awaiting'} text={reviewerData.awaitingApproval} />
                    <BoxedInfo title={'Blocked'} text={reviewerData.blocked} />
                </HStack>
            )
        }
        </SimpleGrid>
        
        <Divider m={15}/>

        <FormLabel>Users</FormLabel>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacingX={6}  textAlign='center' justifyContent='' alignContent='center' alignItems='center'>
         {!userData ? <Spinner size='xl' /> : (
                <HStack>
                    <BoxedInfo title={'Total'} text={userData.total} />
                    <BoxedInfo title={'Blocked'} text={userData.blocked} />
                </HStack>
            )
        }
        </SimpleGrid>
        
        <BestReviewerGamesPieChart />
    </Container>
  )
}