import { Box, Center, Container, Divider, Flex, Heading, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import ImageSlider from '../components/imageSlider'
import { criticCommentAtom } from '../state/criticComment'

export default function CriticCommentView() {
    const [ comment, setComment ] = useRecoilState(criticCommentAtom);

    return (
        <Container maxW={'7xl'}>
            {comment.screenshots.length > 0 && <ImageSlider slides={comment.screenshots} /> }
            
            <Box>
                <Flex justifyContent="left" alignItems="center"  fontSize={{sm:'100%', md:'80%', lg:'4xl'}}>
                    <Text
                        py={2}
                        px={4}
                        m={2}
                        bg="green.600"
                        color="gray.100"
                        fontSize="xl"
                        fontWeight="700"
                        rounded="md"
                    >
                    {comment.grade} 
                    </Text>
                    <Heading marginLeft={5}>
                        {comment.title}
                    </Heading>
                </Flex>

                <Divider />
                <Center my={5}>
                    <Flex justifyContent="left" alignItems="center">
                        <Text width={{sm:'100%', md:'100%', lg:'100%'}} fontSize={{base:'xs', md: 'md', lg: 'lg' }} fontFamily='helvetica'  textAlign='left'>{comment.text}</Text>
                    </Flex>
                </Center>
                <Divider />
                <Text my={3}>Reviewed by : <Link href={`/critic/reviews?name=${comment.author}&email=${comment.authorEmail}`}><b>{comment.author}</b></Link> - {comment.date}</Text>
            </Box>
        </Container>
    )
}
