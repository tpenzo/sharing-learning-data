import express from 'express'
import userCtrl from '../controllers/userCtrl.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()
//router.get('/teacher/all', verifyToken, userCtrl.getAllTeacher)

router.get('/:userId', verifyToken, userCtrl.getUser)
router.get('/teacher/all', userCtrl.getAllTeacher)
router.get('/student/all', userCtrl.getAllStudent)
router.get('/ministry/all', userCtrl.getAllMinistry)
router.post('/follow', verifyToken, userCtrl.followUser)
router.post('/unfollow', verifyToken, userCtrl.UnFollowUser)

export default router