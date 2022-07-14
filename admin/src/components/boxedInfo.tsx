import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function BoxedInfo(props: {title: string, text: string}) {
  return (
    <Box p={5} shadow='md' borderWidth='1px' rounded={5}>
        <Heading fontSize='xl'>{props.title}</Heading>
        <Text mt={4}>{props.text}</Text>
    </Box>
  )
}
