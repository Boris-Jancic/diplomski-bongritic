import { Blog } from "./post";

export module Clients {

    export interface ResponseData {
        currentPage: number,
        totalPages: number,
        clients: Blog.Client[]
    }
}