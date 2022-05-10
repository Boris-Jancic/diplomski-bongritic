
import axios from "axios";
import { Blog } from "../../interface/post";

const BASE_URL = process.env.REACT_APP_API_KEY

export const postReviewerPost = async (post: Blog.CreatePost) => await axios.post<Blog.CreatePost>(`${BASE_URL}/posts`, post)
export const getReviewerPosts = async () => await axios.get<Array<Blog.PostResponse>>(`${BASE_URL}/posts`)
export const getReviewerPost = async (id: string) => await axios.get<Blog.Post>(`${BASE_URL}/posts/one?id=${id}`)
export const getLatestReviewerPost = async () => await axios.get<Blog.Post>(`${BASE_URL}/posts/latest`)