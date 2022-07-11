import axios from "axios";
import { Clients } from "../../interface/clients";
import AxiosClient from "../client/axiosClient";

const BASE_URL = process.env.REACT_APP_API_KEY

export const getUsers = async(page: number, limit: number, createdAt: number) => await AxiosClient.get<Array<Clients.ResponseData>>(`${BASE_URL}/users/paged?page=${page}&limit=${limit}&createdAt=${createdAt}`)

export const updateUserAccess = async (username: string) => await axios.put(`${BASE_URL}/users/access?username=${username}`)

