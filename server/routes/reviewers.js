import express from "express"
import { createReviewer, getReviewers } from "../controllers/reviewers.js"

const router = express.Router()

router.post('/', createReviewer)
router.get('/', getReviewers)

export default router