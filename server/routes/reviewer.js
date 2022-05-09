import express from "express"
import { getReviewers } from "../controllers/reviewer.js"

const router = express.Router()

router.get('/', getReviewers)

export default router