import express from 'express';
import authCtrl from '../controllers/authCtrl.js';
import { check } from 'express-validator'

const router = express.Router();

router.post( '/login',

    check('numbercode', 'numbercode length requires 8 characters').trim().isLength({min: 8, max: 8}),
    check('password', 'password is required').trim().notEmpty(),
    
    authCtrl.login);

router.post( '/register',

    check('numbercode', 'numbercode length requires 8 characters').trim().isLength({min: 8, max: 8}),
    check('password', 'password is required').trim().notEmpty(),

    authCtrl.register);


export default router