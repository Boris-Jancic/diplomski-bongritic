import express from "express"
import { getClients, getTotalUsers, updateClientAccess } from "../controllers/clients.js";
import { getReportedComments, getUserComments } from "../controllers/posts.js";
import { badRequestHandler, checkAdmin } from "./security.js";

const router = express.Router()

router.get('/comments', getUserComments)
router.get('/paged', checkAdmin, badRequestHandler, getClients)
router.get('/reported/comments', checkAdmin, badRequestHandler, getReportedComments)
router.get('/total', checkAdmin, badRequestHandler, getTotalUsers)

router.put('/access', badRequestHandler, checkAdmin, updateClientAccess)

export default router