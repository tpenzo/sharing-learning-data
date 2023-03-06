import express from 'express';
const router = express.Router();
import authRoute from './authRoute.js'
import chatRoute from './chatRoute.js'

router.use('/auth', authRoute);
router.use('/chat', chatRoute)

export default router;