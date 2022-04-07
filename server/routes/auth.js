import express from "express"
import { login, registerClient } from "../controllers/auth.js"

const router = express.Router()

router.post('/client/login', login)
router.post('/register/client', registerClient)

export default router