import express from 'express'
import messageCtrl from '../controllers/messageCtrl.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', verifyToken, messageCtrl.getMessages)
router.post('/send', verifyToken, messageCtrl.sendMessage)

export default router