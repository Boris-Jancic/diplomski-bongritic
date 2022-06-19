import express from "express"
import { getReviewer, getReviewers, getAvatar } from "../controllers/reviewer.js"
import { check, validationResult } from "express-validator";
import { getReviewerComments } from "../controllers/posts.js"

const router = express.Router()

export default router