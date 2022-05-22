
import { Blog } from "../../interface/post";
import AxiosClient from "../client/axiosClient";

const BASE_URL = process.env.REACT_APP_API_KEY

export const postReviewerPost = async (post: Blog.CreatePost) => await AxiosClient.post<Blog.CreatePost>(`${BASE_URL}/posts`, post)

export const getReviewerPosts = async () => await AxiosClient.get<Array<Blog.PostResponse>>(`${BASE_URL}/posts`)

export const getReviewerPost = async (id: string) => await AxiosClient.get<Blog.Post>(`${BASE_URL}/posts/one?id=${id}`)

export const getLatestReviewerPost = async () => await AxiosClient.get<Blog.Post>(`${BASE_URL}/posts/latest`)

export const getCriticReviews = async (email: string) => await AxiosClient.get<any>(`${BASE_URL}/reviewers/comments?email=${email}`)

export const getCriticAverageGrade = async (gameId: string) => await AxiosClient.get<any>(`${BASE_URL}/posts/average/reviewers/grade?id=${gameId}`)