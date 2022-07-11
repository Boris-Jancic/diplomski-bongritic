import express from "express"
import { getClients, updateClientAccess } from "../controllers/clients.js";
import { badRequestHandler, checkAdmin } from "./security.js";

const router = express.Router()

router.get('/paged', checkAdmin, badRequestHandler, getClients)

router.put('/access', updateClientAccess)

export default router