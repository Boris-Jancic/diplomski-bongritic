import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Heading, ButtonGroup, Flex, Input, InputGroup, Badge, useToast, Image, Link } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getReviewers, updateReviewerAccess } from '../../api/reviewers/reviewerService'
import Paginator from '../../components/pagination'
import ReviewerModal from '../../components/modals/reviewerModal'
import { Blog } from '../../interface/post'
import { Reviewers } from '../../interface/reviewers'

export default function ReviewerTable() {
    const toast = useToast()
    const [currentPage, setCurrentPage] = useState(1)
    const [responseData, setResponseData] = useState<Reviewers.ResponseData>({
        totalPages: 1,
        currentPage: 1,
        reviewers: []
    })
    useEffect(() => {
        getReviewers(1, 8, -1).then((res: any) => setResponseData(res.data))
    }, [currentPage])
    
  
    useEffect(() => {
        getReviewers(currentPage, 8, -1).then((res: any) => setResponseData(res.data))
    }, [currentPage])

    const handleAccessClick = async (username: string) => {
        updateReviewerAccess(username)
        .then((res: any) => {
            toast({
                title: res.data.message,
                status: 'success',
                position: 'bottom',
                isClosable: true,
            })
            getReviewers(currentPage, 8, -1).then((res: any) => setResponseData(res.data))
        })
        .catch()
    }

    return (
            <TableContainer>
                <Heading textAlign='left' m={25}>Reviewer table</Heading>
                <Table variant='simple' colorScheme='teal'>
                    <Thead>
                    <Tr>
                        <Th>Avatar</Th>
                        <Th>First name</Th>
                        <Th>Last name</Th>
                        <Th textAlign='center'>JMBG</Th>
                        <Th>Username</Th>
                        <Th>Email</Th>
                        <Th>Activated</Th>
                        <Th textAlign='center'>First created</Th>
                        <Th textAlign='center'>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                        responseData && responseData.reviewers.map((reviewer: Blog.Reviewer) => {
                            return(
                                <Tr key={reviewer.jmbg}>
                                    <Td>
                                        <Image
                                            borderRadius="full"
                                            boxSize="30px"
                                            src={reviewer.avatar}
                                            alt={`Avatar of ${reviewer.username}`}
                                        />
                                    </Td>
                                    <Td>{reviewer.firstName}</Td>
                                    <Td>{reviewer.lastName}</Td>
                                    <Td>{reviewer.jmbg}</Td>
                                    <Td>
                                        <Link
                                            href={`/critic/reviews?name=${reviewer.username}&email=${reviewer.email}`}
                                            fontWeight="700"
                                            cursor="pointer"
                                        >
                                            {reviewer.username}
                                        </Link>    
                                    </Td>
                                    <Td>{reviewer.email}</Td>
                                    <Td textAlign='center'><Badge>{String(reviewer.activated)}</Badge></Td>
                                    <Td>{new Date(reviewer.createdAt).toLocaleString()}</Td>
                                    <Td>
                                        <ButtonGroup variant='outline' spacing={1}>
                                            <ReviewerModal username={reviewer.username} biography={reviewer.biography} />
                                            <Button mx={5} color="red" onClick={() => handleAccessClick(reviewer.username)}>
                                                {reviewer.activated ? <>Block</> : <>Unblock</> }
                                            </Button>
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                    </Tbody>
                </Table>
                <Paginator currentPage={currentPage} totalPages={responseData.totalPages} setCurrentPage={setCurrentPage} />
            </TableContainer>
    )
}
