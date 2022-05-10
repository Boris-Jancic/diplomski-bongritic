import { Flex, useColorModeValue, Box, chakra, Link, Image, Text } from "@chakra-ui/react";
import { Blog } from "../interface/post";

export default function ReviewCard(props: {comment: Blog.ReviewerComment}){
  return (
    <Flex
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
            py={3}
            px={3}
            bg="gray.600"
            color="gray.100"
            fontSize="xl"
            fontWeight="700"
            rounded="md"
          >
            {props.comment.grade}
          </Text>
        </Flex>

        <Box mt={2}>
          <Link
            py={1}
            fontSize=""
            rounded="md"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
              textDecor: "underline",
            }}
          >
              {props.comment.title}
          </Link>
          <Text mt={1} 
            fontSize="md"
            rounded="md"
            color={useColorModeValue("gray.600", "gray.300")}>
            {props.comment.text}
          </Text>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4} 
            fontSize="md">
          <Link
            color={useColorModeValue("brand.600", "brand.400")}
            _hover={{ textDecor: "underline" }}
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