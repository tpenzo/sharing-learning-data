import express from 'express';
const router = express.Router();
import authRoute from './authRoute.js'

router.use('/auth', authRoute);

export default router;