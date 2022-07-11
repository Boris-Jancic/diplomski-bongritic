import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Heading, ButtonGroup, useToast, Image, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getNotApprovedComments, updateCommentStatus } from '../../api/blogs/blogService'
import { getNotApprovedReviewers } from '../../api/reviewers/reviewerService'
import CommentViewModal from '../../components/modals/commentViewModal'
import DenyCommentModal from '../../components/modals/denyCommentModal'
import { Blog } from '../../interface/post'

export default function CommentApprovalTable() {
    const toast = useToast()
    const [comments, setComments] = useState<Array<Blog.ReviewerComment>>()

    useEffect(() => {
        getNotApprovedComments().then((res: any) => setComments(res.data))
    }, [])

    const handleApprovalClick = async (comment: Blog.ReviewerComment) => {
        updateCommentStatus({'game': comment.game, 'commentId': comment._id, 'approved': true})
        .then((res: any) => {
            toast({
                title: res.data.message,
                status: 'success',
                position: 'bottom',
                isClosable: true,
            })
            getNotApprovedComments().then((res: any) => setComments(res.data))
        })
        .catch()
    }

    const handleCommentDenial = (comment: Blog.ReviewerComment, answer: string) => {
        updateCommentStatus({'game': comment.game, 'commentId': comment._id, 'email': comment.authorEmail, 'approved': false, 'answer': answer })
        .then((res: any) => {
                toast({
                    title: res.data.message,
                    status: 'success',
                    position: 'bottom',
                    isClosable: true,
                })
                getNotApprovedComments().then((res: any) => setComments(res.data))
            }
        )
    }

    return (
            <TableContainer>
                <Heading textAlign='left' m={25}>Comments awaiting approval</Heading>
                <Table variant='simple' colorScheme='teal'>
                    <Thead>
                    <Tr>
                        <Th>Avatar</Th>
                        <Th>Author</Th>
                        <Th>Email</Th>
                        <Th>Game</Th>
                        <Th textAlign='center'>Title</Th>
                        <Th>Grade</Th>
                        <Th>Date</Th>
                        <Th textAlign='center'>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                        !comments ? <Spinner my={15} size='xl' /> : comments.map((comment: Blog.ReviewerComment) => {
                            return (
                                <Tr key={comment._id}>
                                    <Td>
                                        <Image
                                            borderRadius="full"
                                            boxSize="30px"
                                            src={comment.avatar}
                                            alt={`Avatar of ${comment.author}`}
                                        />
                                    </Td>
                                    <Td>{comment.author}</Td>
                                    <Td>{comment.authorEmail}</Td>
                                    <Td>{comment.game}</Td>
                                    <Td>{comment.title}</Td>
                                    <Td>{comment.grade}</Td>
                                    <Td>{comment.date}</Td>
                                    <Td>
                                        <CommentViewModal title={comment.title} screenshots={comment.screenshots} text={comment.text} />
                                        <ButtonGroup variant='outline' spacing={1}>
                                            <Button mx={5} color="green.400" onClick={() => handleApprovalClick(comment)}>
                                                Approve
                                            </Button>
                                            <DenyCommentModal comment={comment} handleCommentDenial={handleCommentDenial}/>
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