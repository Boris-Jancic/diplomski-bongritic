import { SpaceProps } from "@chakra-ui/react";
import { Games } from "./game";

export module Blog {
    export interface Post {
        author: string;
        title: string;
        text: string;
        grade: number;
        game?: Games.GameData;
        comments: Comment[];
        avatar: string;
        createdAt: string;
    }

    export interface Comment {
        author: string;
        text: string;
        grade: number;
        comments: Comment[]
    }

    export interface IBlogTags {
        tags: Array<string>;
        marginTop?: SpaceProps['marginTop'];
    }

    export interface BlogAuthorProps {
        date: Date;
        avatar: string;
        name: string;
    }

    export interface PostCardData {
        image: string;
        date: string;
        author: string;
        tags: string[];
        text: string;
    }

    export interface Reviewer {
        
    }

    export interface Client {
        
    }
}
