export module Blog {
    export interface Post {
        author: string;
        title: string;
        text: string;
        grade: number;
        game: number;
        comments: Comment[]
    }

    export interface Comment {
        author: string;
        text: string;
        grade: number;
        comments: Comment[]
    }

    export interface Reviewer {
        
    }

    export interface Client {
        
    }
}
