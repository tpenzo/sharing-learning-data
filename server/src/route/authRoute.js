import express from 'express';
import authCtrl from '../controllers/authCtrl.js';
import { restrictTo, verifyRefreshToken, verifyToken } from '../middlewares/auth.js';
import { 
    loginValidation, 
    registerStudentValidation, 
    registerTeacherValidation
} 
from '../validation/authValidation.js';


const router = express.Router();

router.post('/login', loginValidation, authCtrl.login);

router.post('/register/student' ,authCtrl.registerStudent);
router.post('/register/teacher', registerTeacherValidation, authCtrl.registerTeacher);
router.post('/register/ministry', authCtrl.registerMinistry)
router.post('/register/accounts', authCtrl.createAccounts)


router.post('/account/remove', authCtrl.removeAccount)
router.post('/account/update', authCtrl.updateAccountInfo)



router.get( '/refresh', verifyRefreshToken, authCtrl.requestRefreshToken)
router.get('/logout', verifyToken, authCtrl.logout)


export default router 