import express from "express"
import { getReviewer, getReviewers, getAvatar, alterReviewerAccess } from "../controllers/reviewer.js"
import { check, validationResult } from "express-validator";
import { getReviewerComments } from "../controllers/posts.js"
import { checkAdmin, badRequestHandler } from "./security.js"

const router = express.Router()

router.get('/',
    check('email')
    .isEmpty()
    .isString()
    .trim()
    , getReviewer)

router.get('/paged', getReviewers)

router.get('/comments', getReviewerComments)

router.get('/avatar', check('name').isString().isEmpty(), getAvatar)

router.put('/access',  
    alterReviewerAccess)

export default router