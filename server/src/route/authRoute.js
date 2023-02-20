import express from 'express';
import authCtrl from '../controllers/authCtrl.js';

const router = express.Router();

router.get('/login', authCtrl.login);


export default router