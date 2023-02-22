import express from 'express';
import authCtrl from '../controllers/authCtrl.js';
import { check } from 'express-validator'
import { verifyRefreshToken, verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post( '/login',

    check('email', 'not an email').trim().isEmail(),
    check('password', 'password is required').trim().notEmpty(),
    
    authCtrl.login);

router.post( '/register',

    check('email', 'not an email').trim().isEmail(),
    check('password', 'password is required').trim().notEmpty(),

    authCtrl.register);


router.get( '/refresh', verifyRefreshToken, authCtrl.requestRefreshToken)
router.get('/logout', verifyToken, authCtrl.logout)

export default router