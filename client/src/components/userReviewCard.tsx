import { Flex, useColorModeValue, Box, chakra, Link, Text, Button, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Modal, ModalFooter, useToast, Divider, useDisclosure } from "@chakra-ui/react";
import { Blog } from "../interface/post";
import { BsFlag } from 'react-icons/bs';
import { postUserReport } from "../api/blogs/blogService";

export default function UserCard(props: {key: string, comment: Blog.UserComment}){
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCommentReportSubmit = async () => {
    postUserReport(props.comment)
    .then(response => response.data)
    .then(data =>
      toast({
        title: data,
        status: 'success',
        position: 'bottom',
        isClosable: true,
      }))
    .catch(error => error.response)
    .then(response => response.data)
    .then(data => {
      data.messages.map((msg: string)=> {
        return toast({
          title: msg,
          status: 'warning',
          position: 'bottom',
          isClosable: true,
        })
      })
    })
    onClose()
  }

  return (
    <Flex
      key={props.key}
      p={25}
      w="full"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {props.comment.date}
          </chakra.span>
          <Text
            mx={10}
            color="whatsapp.600"
            decoration="CaptionText" >
            {props.comment.game}
          </Text>
          <Text
            py={1}
            px={3}
            bg="green.600"
            color="gray.100"
            fontSize="xl"
            fontWeight="700"
            rounded="md"
          >
            {props.comment.grade}
          </Text>
        </Flex>

        <Box mt={2}>
          <Text mt={1} 
            fontSize="md"
            rounded="md"
            color={useColorModeValue("gray.600", "gray.300")}>
            {props.comment.text}
          </Text>
        </Box>

        <Divider m={2} />

        <Flex justifyContent="space-between" alignItems="center"
            fontSize="md">

          <Flex alignItems="center">
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
              href={`/user/reviews?name=${props.comment.author}`}
            >
              {props.comment.author}
            </Link>
          </Flex>
          <Button variant='ghost' rightIcon={<BsFlag color="red" />} onClick={onOpen}>
            Flag
          </Button>
        </Flex>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size='md'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Report this comment?</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button colorScheme='green' mr={3} onClick={() => handleCommentReportSubmit()}>
                Yes
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </Box>
    </Flex>
  );
};