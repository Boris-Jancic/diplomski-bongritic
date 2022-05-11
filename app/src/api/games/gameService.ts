
import axios from "axios";
import { Games } from "../../interface/game";

const API_KEY = process.env.REACT_APP_RAWG_API_KEY

export const getGames = async (name: string) => await axios.get<Games.GameData>(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
export const getGame = async (id: number) => await axios.get<Games.GameData>(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
export const getGameTrailers = async (id: number) => await axios.get<Games.GameMovies>(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`)