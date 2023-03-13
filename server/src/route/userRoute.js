import express from 'express'
import userCtrl from '../controllers/userCtrl.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.get('/search', verifyToken, userCtrl.search)
router.get('/:userId', verifyToken, userCtrl.getUser)
router.post('/follow', verifyToken, userCtrl.followUser)
router.post('/unfollow', verifyToken, userCtrl.UnFollowUser)

export default router