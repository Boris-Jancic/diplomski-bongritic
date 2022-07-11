import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text } from "@chakra-ui/react"
import { useState } from "react"
import ImageSlider from "../imageSlider"

export default function CommentViewModal(props: {title: string, screenshots: Array<string>, text: string}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} color="cyan.400">View</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
            {props.screenshots.length > 0 && <ImageSlider slides={props.screenshots} /> }
            <Text p={5}>
                {props.text}
            </Text>
          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}