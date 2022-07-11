import express from "express"
import { getReviewer, getReviewers, getNotApprovedReviewers, getAvatar, alterReviewerAccess, manageReviewerRegistrationRequest } from "../controllers/reviewer.js"
import { check } from "express-validator";
import { getReviewerComments } from "../controllers/posts.js"
import { checkAdmin, badRequestHandler } from "./security.js"

const router = express.Router()

router.get('/',
    check('email')
    .isEmpty()
    .isString()
    .trim()
    , getReviewer)
router.get('/paged', checkAdmin, badRequestHandler, getReviewers)
router.get('/registration', badRequestHandler,getNotApprovedReviewers)
router.get('/comments', getReviewerComments)
router.get('/avatar', check('name').isString().isEmpty(), getAvatar)

router.put('/registration', badRequestHandler, manageReviewerRegistrationRequest)
router.put('/access', checkAdmin, badRequestHandler, alterReviewerAccess)

export default router
