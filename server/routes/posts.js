import express from "express"
import { check, validationResult, header } from "express-validator";
import { createPost, getLatestPost, getPosts, getPost, getAverageGrades } from "../controllers/posts.js"

const router = express.Router()

router.post('/', createPost)

router.get('/', getPosts)

router.get('/one', getPost)

router.get('/latest', getLatestPost)

router.get('/average/reviewers/grade', getAverageGrades)

// router.get('/average/users/grade', getAverageGrades)

export default router