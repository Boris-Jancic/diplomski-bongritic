import React, { useEffect, useState } from 'react';
import { Box, Button, Center, FormControl, FormLabel, Heading, Image, Input, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, Textarea, useToast } from '@chakra-ui/react';
import { getGame } from '../api/games/gameService';
import { Blog } from '../interface/post';
import { Games } from '../interface/game';
import { authAtom } from '../state/auth';
import { useRecoilState } from 'recoil';
import { postReviewerPost } from '../api/blogs/blogService';

export default function GameReview() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const toast = useToast();
    const [user, setUser] = useRecoilState(authAtom);
    const [game, setGame] = useState<Games.GameData>();
    const [post, setPost] = useState<Blog.CreatePost>(
        {
            game: game,
            comment: {
                title: '',
                game: '',
                author: user.name,
                authorEmail: user.email,
                avatar: user.avatar,
                text: '',
                grade: 0,
                date: '',
                approved: false,
                _id: ''
            },
        }
    );

    useEffect(() => {
        getGame(Number(id))
        .then(response => setGame(response.data))
    })

    const inputHandlerSlider = (grade: number) => {
        post.comment.grade = grade
    }

    const titleChangeHandler = (title: string) => {
        post.comment.title = title
    }

    const textChangeHandler = (text: string) => {
        post.comment.text = text 
    }

    const handleSubmit = async () => {
        post.game = game
        post.comment.game = game?.name

        await postReviewerPost(post)
        .then(response => console.log(response))
        .then(() => window.location.assign('review/success'))

        .catch(error => error.response)
        .then(payload => payload.data)
        .then(data => {
            toast({
                title: data.message,
                status: 'error',
                position: 'bottom',
                isClosable: true,
            })
        })
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
                    <Input type="text" id='title' onChange={(event: React.ChangeEvent<HTMLInputElement>) => titleChangeHandler(event.target.value)}/>
                    <FormLabel htmlFor='text'>Review text</FormLabel>
                    <Textarea
                        id='text' 
                        //@ts-ignore
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => textChangeHandler(event.target.value)} />
                        
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