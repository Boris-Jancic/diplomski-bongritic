import { Blog } from "../../interface/post";
import AxiosClient from "../client/axiosClient";
import { TokenService } from "../client/tokenService";

const BASE_URL = process.env.REACT_APP_API_KEY
const user = TokenService.getUserFromToken()

export const getReviewer = async(email: string) => await AxiosClient.get<Blog.Reviewer>(`${BASE_URL}/reviewers?email=${email}`)

export const postReviewerPost = async (post: Blog.CreatePost) => await AxiosClient.post<Blog.CreatePost>(`${BASE_URL}/posts`, post, {headers: {"Authorization" : `${user.role}`}})

export const getPosts = async (page: number, limit: number, createdAt: number) => await AxiosClient.get<Array<Blog.PostResponse>>(`${BASE_URL}/posts?page=${page}&limit=${limit}&createdAt=${createdAt}`)

export const getPostsByGame = async (page: number, limit: number, gameName: string) => await AxiosClient.get<Array<Blog.PostResponse>>(`${BASE_URL}/posts/game?page=${page}&limit=${limit}&gameName=${gameName}`)

export const getReviewerPost = async (id: string) => await AxiosClient.get<Blog.Post>(`${BASE_URL}/posts/one?id=${id}`)

export const getLatestReviewerPost = async () => await AxiosClient.get<Blog.Post>(`${BASE_URL}/posts/latest`)

export const getCriticReviews = async (email: string) => await AxiosClient.get<any>(`${BASE_URL}/reviewers/comments?email=${email}`)

export const getUserReviews = async (username: string) => await AxiosClient.get<any>(`${BASE_URL}/users/comments?username=${username}`)

export const getCriticAverageGrade = async (gameId: string) => await AxiosClient.get<Blog.AverageGrades>(`${BASE_URL}/posts/average/reviewers/grade?id=${gameId}`)

export const getUserAverageGrade = async (gameId: string) => await AxiosClient.get<Blog.AverageGrades>(`${BASE_URL}/posts/average/users/grade?id=${gameId}`)