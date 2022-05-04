import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Container, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, IconButton, Image, Input, RangeSliderFilledTrack, RangeSliderMark, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, Textarea, toast, useBreakpointValue, useToast } from '@chakra-ui/react';
import { getGame } from '../api/games/gameService';
import { Blog } from '../interface/post';
import { Games } from '../interface/game';
import { authAtom } from '../state/auth';
import { useRecoilState } from 'recoil';
import { postReviewerPost } from '../api/blogs/blogService';
import { error } from 'console';

export default function GameReview() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const toast = useToast()
    const [user, setUser] = useRecoilState(authAtom);
    const [game, setGame] = useState<Games.GameData>()
    const [post, setPost] = useState<Blog.Post>(
        {
        author: user.email,
        title: '',
        text: '',
        grade: 1,
        game: game,
        avatar: '',
        createdAt: '',
        comments: []}
    )

    useEffect(() => {
        getGame(Number(id))
        .then(response => setGame(response.data))
    }, [])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, prop: string) => {
        const postChanged = {...post};
        //@ts-ignore
        postChanged[prop] = e.target.value;
        setPost(postChanged)
    }

    const inputHandlerSlider = (grade: number) => {
        post.grade = grade
    }

    const handleSubmit = async () => {
        post.game = game
        console.log(post)
        await postReviewerPost(post)
        .then(() => window.location.assign('review/success'))

        .catch(error => error.response)
        .then(payload => payload.data)
        .then(data => data.messages?.map((message: String) => {
            toast({
                title: message,
                status: 'error',
                position: 'bottom',
                isClosable: true,
            })
        }))
    }

    return (
        <Box>
            <Center>
                <Image src={game?.background_image} w="50%" rounded="20px" position='relative' borderRadius='full'/>
            </Center>
            
            <Center>
            <Heading>
                <Text as="h1" fontWeight="black" my={2} align='left'>
                Reviewing: <u>{game?.name}</u>
                </Text>
            </Heading>
            </Center>

            <Center>
                <FormControl width={{ base: '90%', md: '80%', lg: '60%' }}>
                    <FormLabel htmlFor='title'>Title</FormLabel>
                    <Input type="text" id='title' onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'title')}/>
                    <FormLabel htmlFor='text'>Review text</FormLabel>
                    <Textarea
                        id='text' 
                        //@ts-ignore
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, 'text')} />
                        
                    <FormLabel htmlFor='grade'>Grade</FormLabel>
                    
                    <Slider aria-label='slider-ex-1' colorScheme='green' id='grade' defaultValue={1} min={1} max={5}
                        onChange={(value: number) => inputHandlerSlider(value)} >
                        <SliderMark value={1} mt='1' ml='-2.5' fontSize='sm'>
                            1
                        </SliderMark>
                        <SliderMark value={2} mt='1' ml='-2.5' fontSize='sm'>
                            2
                        </SliderMark>
                        <SliderMark value={3} mt='1' ml='-2.5' fontSize='sm'>
                            3
                        </SliderMark>
                        <SliderMark value={4} mt='1' ml='-2.5' fontSize='sm'>
                            4
                        </SliderMark>
                        <SliderMark value={5} mt='1' ml='-2.5' fontSize='sm'>
                            5
                        </SliderMark>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb color='green.900' />
                    </Slider>

                    <Button 
                        mt={4}
                        width='200px' 
                        colorScheme='teal' 
                        size='lg' 
                        variant='outline' 
                        color='green.500'
                        fontSize={'sm'}
                        fontWeight={400}
                        onClick={() => handleSubmit()}>
                        Review
                    </Button>
                </FormControl>
            </Center>
        </Box>
    );
}