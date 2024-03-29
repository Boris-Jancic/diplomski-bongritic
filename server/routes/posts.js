import express from "express"
import { check } from "express-validator";
import { 
    createPost,
    getLatestPost,
    getPosts,
    getPost,
    createUserComment,
    getAverageGradesReviewer,
    getAverageGradesUser,
    getPostByGameName,
    reportUserComment,
    updateReviewerCommentStatus,
    getNotApprovedComments,
    updateUserCommentStatus,
    getTopRatedReviewerGames
} from "../controllers/posts.js"
import { checkClient, checkReviewer, checkAdmin, badRequestHandler } from "./security.js"

const router = express.Router()

router.get('/', getPosts) 
router.get('/one', getPost)
router.get('/latest', getLatestPost)
router.get('/average/reviewers/grade', getAverageGradesReviewer)
router.get('/average/users/grade', getAverageGradesUser)
router.get('/game', getPostByGameName)
router.get('/top-rated/reviewer/games', badRequestHandler, checkAdmin, getTopRatedReviewerGames)
router.get('/not-approved/comments',
    [],
    checkAdmin,
    badRequestHandler,
    getNotApprovedComments)

router.post('/',
    [],
    checkReviewer,
    badRequestHandler,
    createPost)
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
router.post('/user/comment/report',
    [],
    checkClient,
    reportUserComment)

router.put('/comment/approval', updateReviewerCommentStatus)
router.put('/user/comment/update', updateUserCommentStatus)

export default router