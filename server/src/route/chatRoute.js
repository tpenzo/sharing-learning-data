import express from "express";
import chatCtrl from "../controllers/chatCtrl.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', verifyToken, chatCtrl.fetchChats)
router.post('/access', verifyToken, chatCtrl.accessChat)
router.post('/creategroup', verifyToken, chatCtrl.createGroupChat)


export default router