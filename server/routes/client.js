import express from "express"
import { getReviewer, getReviewers, getAvatar } from "../controllers/reviewer.js"
import { check, validationResult } from "express-validator";
import { getUserComments } from "../controllers/posts.js"

const router = express.Router()

router.get('/comments', getUserComments)

export default router