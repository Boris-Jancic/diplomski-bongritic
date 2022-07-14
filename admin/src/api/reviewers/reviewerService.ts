import axios from "axios";
import { Blog } from "../../interface/post";
import AxiosClient from "../client/axiosClient";
import { TokenService } from "../client/tokenService";

const user = TokenService.getUserFromToken()
const BASE_URL = process.env.REACT_APP_API_KEY

export const getNotApprovedReviewers = async(page: number, limit: number, createdAt: number) => await AxiosClient.get<Array<Blog.Reviewer>>(`${BASE_URL}/reviewers/registration?page=${page}&limit=${limit}&createdAt=${createdAt}`)

export const getReviewers = async(page: number, limit: number, createdAt: number) => await AxiosClient.get<Array<Blog.Reviewer>>(`${BASE_URL}/reviewers/paged?page=${page}&limit=${limit}&createdAt=${createdAt}`)

export const updateReviewerRegistrationRequest = async (email: string, approved: boolean) => await axios.put(`${BASE_URL}/reviewers/registration?email=${email}&approved=${approved}`, {}, {headers: {"Authorization" : `${user.role}`}})

export const updateReviewerAccess = async (username: string) => await axios.put(`${BASE_URL}/reviewers/access?username=${username}`, {}, {headers: {"Authorization" : `${user.role}`}})

export const getTotalReviewers = async () => await AxiosClient.get(`${BASE_URL}/reviewers/total`)