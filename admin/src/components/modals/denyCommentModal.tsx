import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Textarea, FormLabel, Flex, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import { updateCommentStatus } from "../../api/blogs/blogService"
import { Blog } from "../../interface/post"

export default function DenyCommentModal(props: {comment: Blog.ReviewerComment, handleCommentDenial: Function}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ answer, setAnswer ] = useState<string>()

    const handleSubmit = () => {
        props.handleCommentDenial(props.comment, answer)
        return onClose()
    }

    return (
        <>
            <Button onClick={onOpen} color="red.400">Deny</Button>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Write a quick message for the author of this comment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormLabel>{props.comment.author}'s comment : </FormLabel>
                    <Flex border="1px" p={5} my={5}>
                        {props.comment.text}
                    </Flex>
                    <FormLabel>Answer why this comment is harmfull to the community </FormLabel>
                    <Textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button colorScheme='green' mr={3} onClick={handleSubmit}>
                    Send 
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}