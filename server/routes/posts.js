import express from "express"
import { check, validationResult } from "express-validator";
import { createPost, getLatestPost, getPosts, getPost } from "../controllers/posts.js"

const router = express.Router()

router.post('/', createPost)

router.get('/', getPosts)

router.get('/one', getPost)

router.get('/latest', getLatestPost)

export default router