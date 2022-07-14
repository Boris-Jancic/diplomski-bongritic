import { SpaceProps } from "@chakra-ui/react";
import { Games } from "./game";

export module Blog {
    export interface PostResponse {
        totalPages: number;
        currentPage: number;
        posts: Post[];
    }

    export interface Post {
        _id: string;
        grade: number;
        game?: Games.GameData;
        reviewerComments: ReviewerComment[];
        userComments: UserComment[];
        avatar: string;
        createdAt: string;
    }

    export interface AverageGrades {
        _id: string;
        critic: number;
        user: number;
    }

    export interface CreatePost {
        game?: Games.GameData;
        comment: ReviewerComment;
    }

    export interface ReviewerComment {
        game: string;
        author: string;
        authorEmail: string;
        avatar: string;
        title: string;
        text: string;
        grade: number;
        date: string;
        approved: boolean;
        screenshots: Array<string>;
        _id: string;
    }

    export interface CommentResponseData {
        totalPages: number;
        currentPage: number;
        comments: ReviewerComment[];
    }

    export interface UserComment {
        game: string;
        author: string;
        text: string;
        grade: number;
        date: string;
        _id: string;
    }

    export interface IBlogTags {
        tags: Array<string>;
        marginTop?: SpaceProps['marginTop'];
    }

    export interface BlogAuthorProps {
        date?: Date;
        avatar?: string;
        name?: string;
        email?: string;
    }

    export interface PostCardData {
        image: string;
        date: string;
        author: string;
        tags: string[];
        text: string;
    }

    export interface Reviewer {
        firstName: string;
        lastName: string;
        username: string;
        jmbg: string;
        email: string;
        avatar: string;
        biography: string;
        createdAt: string;
        activated: boolean;
    }

    export interface Client {
        username: string;
        email: string;
        activated: boolean;
        createdAt: string;
        _id: string;
    }

    export interface TopRatedGames {
        reviewerTopGames: TopRatedGame[]
        userTopGames: TopRatedGame[]
    }

    export interface TopRatedGame {
        game: string,
        criticGrade: number
    }
}
