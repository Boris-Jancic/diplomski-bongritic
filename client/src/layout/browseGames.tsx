import { Container, Input, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import { getGames } from '../api/games/gameService'
import GameCard from '../components/gameCard'
import { Games } from '../interface/game'

export default function BrowseGames() {
  const [data, setData] = useState([])

  useEffect(() => {
      getGames('').then((response) => response.data)
      .then((data: any) => setData(data.results))
  }, [])
    
  const debouncedSearch = debounce(async (criteria) => {
    getGames(criteria).then((response) => response.data)
    .then((data: any) => setData(data.results))
  }, 500);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  }

  return (
    <div>
      <Container maxW="120rem" centerContent>
        
        <Text mb='8px'>Search for a game</Text>
        <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
            placeholder='Search'
            size='sm'
        />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacingX={6}>
        {data.length < 1 ? <Spinner size='xl' /> : (
          data?.map(game => {
            const { slug, id, background_image, name, parent_platforms, genres, released } = game;
            return (
            <>
              <GameCard 
                key={slug}
                id={id}
                background_image={background_image}
                name={name}
                platforms={parent_platforms}
                genres={genres} 
                released={released}/>
            </>)
            })
          )
        }
        </SimpleGrid>
      </Container>
    </div>
  )
}