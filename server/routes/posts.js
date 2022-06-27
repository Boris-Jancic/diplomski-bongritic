import express from "express"
import { check, validationResult, header } from "express-validator";
import { 
    createPost,
    getLatestPost,
    getPosts,
    getPost,
    createUserComment,
    getAverageGradesReviewer,
    getAverageGradesUser,
    getPostByGameName
} from "../controllers/posts.js"
import { checkClient, checkReviewer, badRequestHandler } from "./security.js"

const router = express.Router()

router.post('/', checkReviewer, createPost)

router.post('/user/comment', 
    [
        check("text")
            .isString()
            .notEmpty()
            .trim()
            .withMessage("Your review comment can't be empty"),
        check("grade")
            .isNumeric()
            .isIn([1,2,3,4,5])
            .withMessage("Please select a grade for your review"),
    ],
    badRequestHandler,
    checkClient,
    createUserComment)

router.get('/', getPosts)

router.get('/one', getPost)

router.get('/latest', getLatestPost)

router.get('/average/reviewers/grade', getAverageGradesReviewer)

router.get('/average/users/grade', getAverageGradesUser)

router.get('/game', getPostByGameName)

export default router