
import axios from "axios";
import { Blog } from "../../interface/post";

const BASE_URL = process.env.REACT_APP_API_KEY

export const postReviewerPost = async (post: Blog.Post) => await axios.post<Blog.Post>(`${BASE_URL}/posts`, post)
export const getReviewerPosts = async () => await axios.get<Array<Blog.PostResponse>>(`${BASE_URL}/posts`)
export const getLatestReviewerPost = async () => await axios.get<Blog.Post>(`${BASE_URL}/posts/latest`)