import express from 'express'
import commentCtrl from '../controllers/commentCtrl.js'
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router()

router.get('/:postId', verifyToken, commentCtrl.getComments)
router.post('/create', verifyToken, commentCtrl.createComment)
router.patch('/:id', verifyToken, commentCtrl.updateComment)
router.patch('/:id/like', verifyToken, commentCtrl.likeComment)
router.patch('/:id/unlike', verifyToken, commentCtrl.unLikeComment)
router.delete('/:id', verifyToken, commentCtrl.deleteComment)
router.post('/reply', verifyToken, commentCtrl.replyComment)


export default router