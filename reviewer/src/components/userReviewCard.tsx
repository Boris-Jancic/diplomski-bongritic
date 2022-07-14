import { Flex, useColorModeValue, Box, chakra, Link, Text, Divider } from "@chakra-ui/react";
import { Blog } from "../interface/post";

export default function UserCard(props: {key: string, comment: Blog.UserComment}){

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
        width="100%"
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
        </Flex>

      </Box>
    </Flex>
  );
};