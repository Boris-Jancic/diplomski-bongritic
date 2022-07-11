import { Blog } from "../../interface/post";
import AxiosClient from "../client/axiosClient";
import { TokenService } from "../client/tokenService";

const user = TokenService.getUserFromToken()
const BASE_URL = process.env.REACT_APP_API_KEY

export const getPosts = async (page: number, limit: number, createdAt: number) => await AxiosClient.get<Array<Blog.PostResponse>>(`${BASE_URL}/posts?page=${page}&limit=${limit}&createdAt=${createdAt}`)
export const postReviewerPost = async (post: Blog.CreatePost) => await AxiosClient.post<Blog.CreatePost>(`${BASE_URL}/posts`, post)

export const getPostsByGame = async (page: number, limit: number, gameName: string) => await AxiosClient.get<Array<Blog.PostResponse>>(`${BASE_URL}/posts/game?page=${page}&limit=${limit}&gameName=${gameName}`)
export const getLatestReviewerPost = async () => await AxiosClient.get<Blog.Post>(`${BASE_URL}/posts/latest`)
export const getReviewerPost = async (id: string) => await AxiosClient.get<Blog.Post>(`${BASE_URL}/posts/one?id=${id}`)

export const getUserReviews = async (username: string) => await AxiosClient.get<any>(`${BASE_URL}/users/comments?username=${username}`)
export const getUserAverageGrade = async (gameId: string) => await AxiosClient.get<Blog.AverageGrades>(`${BASE_URL}/posts/average/users/grade?id=${gameId}`)

export const getReviewer = async(email: string) => await AxiosClient.get<Blog.Reviewer>(`${BASE_URL}/reviewers?email=${email}`)
export const getCriticReviews = async (email: string) => await AxiosClient.get<any>(`${BASE_URL}/reviewers/comments?email=${email}`)
export const getCriticAverageGrade = async (gameId: string) => await AxiosClient.get<Blog.AverageGrades>(`${BASE_URL}/posts/average/reviewers/grade?id=${gameId}`)

export const getReportedComments = async () => await AxiosClient.get<Array<Blog.UserComment>>(`${BASE_URL}/users/reported/comments`)
export const getNotApprovedComments = async () => await AxiosClient.get<Array<Blog.ReviewerComment>>(`${BASE_URL}/posts/not-approved/comments`)
export const updateReviewerCommentStatus = async (updateComment: any) => await AxiosClient.put<any>(`${BASE_URL}/posts/comment/approval`, updateComment, {headers: {"Authorization" : `${user.role}`}})
export const updateUserCommentStatus = async (updateComment: any) => await AxiosClient.put<any>(`${BASE_URL}/posts/user/comment/update`, updateComment, {headers: {"Authorization" : `${user.role}`}})