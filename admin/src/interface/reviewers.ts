import { Blog } from "./post";

export module Reviewers {
    export interface ResponseData {
        currentPage: number,
        totalPages: number,
        reviewers: Blog.Reviewer[]
    }
}