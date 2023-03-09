import express from 'express';
const router = express.Router();
import authRoute from './authRoute.js'
import chatRoute from './chatRoute.js'
import messageRoute from './messageRoute.js'
import userRoute from './userRoute.js'

router.use('/auth', authRoute);
router.use('/chat', chatRoute)
router.use('/message', messageRoute)
router.use('/user', userRoute)

export default router;