import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Heading, ButtonGroup, Badge, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Paginator from '../../components/pagination'
import { Blog } from '../../interface/post'
import { Clients } from '../../interface/clients'
import { getUsers, updateUserAccess } from '../../api/clients/clientService'

export default function UserTable() {
    const toast = useToast()
    const [currentPage, setCurrentPage] = useState(1)
    const [responseData, setResponseData] = useState<Clients.ResponseData>({
        totalPages: 1,
        currentPage: 1,
        clients: []
    })
  
    useEffect(() => {
        getUsers(currentPage, 1, -1).then((res: any) => setResponseData(res.data))
    }, [currentPage])

    const handleAccessClick = async (username: string) => {
        updateUserAccess(username)
        .then((res: any) => {
            toast({
                title: res.data.message,
                status: 'success',
                position: 'bottom',
                isClosable: true,
            })
            getUsers(currentPage, 8, -1).then((res: any) => setResponseData(res.data))
        })
        .catch()
    }

    return (
            <TableContainer>
                <Heading textAlign='left' m={25}>Reviewer table</Heading>
                <Table variant='simple' colorScheme='teal'>
                    <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>Email</Th>
                        <Th textAlign='center'>First created</Th>
                        <Th>Activated</Th>
                        <Th textAlign='center'>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                        responseData && responseData.clients.map((client: Blog.Client) => {
                            return(
                                <Tr key={client._id}>
                                    <Td>{client.username}</Td>
                                    <Td>{client.email}</Td>
                                    <Td>{new Date(client.createdAt).toLocaleString()}</Td>
                                    <Td textAlign='center'><Badge>{String(client.activated)}</Badge></Td>
                                    <Td>
                                        <ButtonGroup variant='outline' spacing={1}>
                                            <Button mx={5} color="red" onClick={() => handleAccessClick(client.username)}>
                                                {client.activated ? <>Block</> : <>Unblock</> }
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
