import express from "express"
import { getReviewer, getReviewers, getAvatar } from "../controllers/reviewer.js"
import { check, validationResult } from "express-validator";
import { getReviewerComments } from "../controllers/posts.js"

const router = express.Router()

router.get('/',
    check('email')
    .isEmpty()
    .isString()
    .trim()
    , getReviewer)

router.get('/', getReviewers)

router.get('/comments', getReviewerComments)

router.get('/avatar', check('name').isString().isEmpty(), getAvatar)

export default router