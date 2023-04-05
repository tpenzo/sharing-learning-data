import express from "express";
import coursesCtrl from "../controllers/coursesCtrl.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// router.get('/all', verifyToken, coursesCtrl.getAllCourses)
// router.post('/create', verifyToken, coursesCtrl.createCourse)
// router.delete('/delete', verifyToken, coursesCtrl.removeCourse)
// router.post('/update',verifyToken, coursesCtrl.updateCourse)
// router.post('/addStudent', verifyToken, coursesCtrl.addStudentIntoCourse)
// router.delete('/removeStudent', verifyToken, coursesCtrl.removeStudentFromCourse)
// router.post('/updateTeacher', verifyToken, coursesCtrl.updateTeacherCourse)

router.get('/all/:page',verifyToken, coursesCtrl.getAllCourses)
router.get('/:_courseId',verifyToken, coursesCtrl.getCourse)
router.post('/create',verifyToken, coursesCtrl.createCourse)
router.post('/delete',verifyToken, coursesCtrl.removeCourse)
router.post('/update',verifyToken, coursesCtrl.updateCourse)

router.post('/addStudent',verifyToken, coursesCtrl.addStudentIntoCourse)
router.delete('/removeStudent',verifyToken, coursesCtrl.removeStudentFromCourse)
router.post('/updateTeacher',verifyToken, coursesCtrl.updateTeacherCourse)

export default router;