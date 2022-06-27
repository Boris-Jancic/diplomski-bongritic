import { Flex, useColorModeValue, Box, chakra, Link, Image, Text } from "@chakra-ui/react";
import { Blog } from "../interface/post";

export default function UserCard(props: {key: string, comment: Blog.UserComment}){
  console.log(props.comment)
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
            py={1}
            px={3}
            marginLeft={5}
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

        <Flex justifyContent="space-between" alignItems="center" mt={4} 
            fontSize="md">

          <Flex alignItems="center">
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