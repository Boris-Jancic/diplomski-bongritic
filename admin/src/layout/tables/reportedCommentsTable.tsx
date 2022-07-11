import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Heading, ButtonGroup, useToast, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getReportedComments, getNotApprovedComments, updateReviewerCommentStatus, updateUserCommentStatus } from '../../api/blogs/blogService'
import { Blog } from '../../interface/post'

export default function ReportedCommentTable() {
    const toast = useToast()
    const [comments, setComments] = useState<Array<Blog.UserComment>>()

    useEffect(() => {
        getReportedComments().then((res: any) => setComments(res.data))
    }, [])

    const handleApprovalClick = async (comment: Blog.UserComment) => {
        updateUserCommentStatus({'game': comment.game, 'commentId': comment._id, 'deletion': false})
        .then((res: any) => {
            toast({
                title: res.data.message,
                status: 'success',
                position: 'bottom',
                isClosable: true,
            })
            getReportedComments().then((res: any) => setComments(res.data))
        })
        .catch()
    }

    const handleCommentDelete = (comment: Blog.UserComment) => {
        updateUserCommentStatus({'game': comment.game, 'commentId': comment._id, 'email': comment.author, 'deletion': true})
        .then((res: any) => {
                toast({
                    title: res.data.message,
                    status: 'success',
                    position: 'bottom',
                    isClosable: true,
                })
                getReportedComments().then((res: any) => setComments(res.data))
            }
        )
    }

    return (
            <TableContainer>
                <Heading textAlign='left' m={25}>Reported comments</Heading>
                <Table variant='simple' colorScheme='teal'>
                    <Thead>
                    <Tr>
                        <Th>Author</Th>
                        <Th>Game</Th>
                        <Th>Grade</Th>
                        <Th>Posted</Th>
                        <Th textAlign='center'>Text</Th>
                        <Th textAlign='center'>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                        !comments ? <Spinner my={15} size='xl' /> : comments.map((comment: Blog.UserComment) => {
                            return (
                                <Tr key={comment._id}>
                                    <Td>{comment.author}</Td>
                                    <Td>{comment.game}</Td>
                                    <Td>{comment.grade}</Td>
                                    <Td>{comment.date}</Td>
                                    <Td>{comment.text}</Td>
                                    <Td>
                                        <ButtonGroup variant='outline' spacing={1}>
                                            <Button mx={5} color="green.400" onClick={() => handleApprovalClick(comment)}>
                                                Remove flag
                                            </Button>
                                            <Button mx={5} color="red.400" onClick={() => handleCommentDelete(comment)}>
                                                Delete
                                            </Button>
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                    </Tbody>
                </Table>
            </TableContainer>
    )
}