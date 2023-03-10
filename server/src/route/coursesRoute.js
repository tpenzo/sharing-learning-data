import express from "express";
import coursesCtrl from "../controllers/coursesCtrl.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// router.get('/all', verifyToken, coursesCtrl.getAllCourses)
// router.post('/create', verifyToken, coursesCtrl.createCourse)
// router.delete('/delete', verifyToken, coursesCtrl.removeCourse)
// router.post('/addStudent', verifyToken, coursesCtrl.addStudentIntoCourse)
// router.delete('/removeStudent', verifyToken, coursesCtrl.removeStudentFromCourse)
// router.post('/updateTeacher', verifyToken, coursesCtrl.updateTeacherCourse)

router.get('/all',  coursesCtrl.getAllCourses)
router.post('/create', coursesCtrl.createCourse)
router.delete('/delete', coursesCtrl.removeCourse)

router.post('/addStudent', coursesCtrl.addStudentIntoCourse)
router.delete('/removeStudent', coursesCtrl.removeStudentFromCourse)
router.post('/updateTeacher', coursesCtrl.updateTeacherCourse)

export default router;