import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getGame } from '../api/games/gameService';
import { Games } from '../interface/game';

export default function GameReview() {
  const queryParams = new URLSearchParams(window.location.search);
  const [game, setGame] = useState<Games.GameData>()

  const id = queryParams.get('id');

  useEffect(() => {
    getGame(Number(id))
    .then(response => setGame(response.data))
  }, [])
  

  console.log(game)

  return (
    <div>{game?.description_raw}</div>
  )
}
