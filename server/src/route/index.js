import express from 'express';
const router = express.Router();
import authRoute from './authRoute.js'
import chatRoute from './chatRoute.js'
import messageRoute from './messageRoute.js'
import coursesRoute from './coursesRoute.js'

router.use('/auth', authRoute);
router.use('/chat', chatRoute)
router.use('/message', messageRoute);
router.use('/courses', coursesRoute)

export default router;