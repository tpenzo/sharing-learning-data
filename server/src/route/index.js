import express from 'express';
const router = express.Router();
import authRoute from './authRoute.js'
import chatRoute from './chatRoute.js'
import messageRoute from './messageRoute.js'

router.use('/auth', authRoute);
router.use('/chat', chatRoute)
router.use('/message', messageRoute)

export default router;