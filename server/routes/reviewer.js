import express from "express"
import { getReviewers, getAvatar } from "../controllers/reviewer.js"
import { check, validationResult } from "express-validator";
import { getReviewerComments } from "../controllers/posts.js"

const router = express.Router()

router.get('/', getReviewers)

router.get('/comments'
    // check('name')
    // .isEmpty()
    // .isString()
, getReviewerComments)

router.get('/avatar', check('name').isString().isEmpty(), getAvatar)

export default router