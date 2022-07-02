import { Flex, useColorModeValue, Box, chakra, Link, Image, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { Blog } from "../interface/post";
import { criticCommentAtom } from "../state/criticComment";

export default function ReviewCard(props: {key: string, comment: Blog.ReviewerComment}){
  const setCriticComment = useSetRecoilState(criticCommentAtom);

  const handleReadMore = () => {
    setCriticComment(props.comment.author)
    localStorage.setItem('criticComment', JSON.stringify(props.comment))
  }

  return (
    <Flex
      p={25}
      alignItems="flex-start"
      justifyContent="center"
    >
      <Box
        key={props.key}
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="3xl"
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
          <Text
            py={1}
            fontSize=""
            rounded="md"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
          >
              {props.comment.title}
          </Text>
          <Text mt={1} 
            fontSize="md"
            rounded="md"
            color={useColorModeValue("gray.600", "gray.300")}
            noOfLines={3}>
            {props.comment.text}
          </Text>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4} 
            fontSize="md">
          <Link
            color={useColorModeValue("brand.600", "brand.400")}
            _hover={{ textDecor: "underline" }}
            onClick={() => handleReadMore()}
            href={`/post/review/critic?=${props.comment.author}&game=${props.comment}`}
          >
            Read more
          </Link>

          <Flex alignItems="center">
            <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              display={{ base: "none", sm: "block" }}
              src={props.comment.avatar}
              alt="avatar"
            />
            <Link
              href={`/critic/reviews?name=${props.comment.author}&email=${props.comment.authorEmail}`}
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              {props.comment.author}
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};