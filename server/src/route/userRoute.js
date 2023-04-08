import express from "express";
import userCtrl from "../controllers/userCtrl.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/teacher/all/:page", verifyToken, userCtrl.getAllTeacher);
router.get("/student/all/:page", verifyToken, userCtrl.getAllStudent);
router.get("/ministry/all/:page", verifyToken, userCtrl.getAllMinistry);
router.get("/search", verifyToken, userCtrl.search);
router.get("/:userId", verifyToken, userCtrl.getUser);
router.get("/student/:studentCode", verifyToken, userCtrl.getStudentByCode);
// router.get('/teacher/all', userCtrl.getAllTeacher)
// router.get('/student/all', userCtrl.getAllStudent)
// router.get('/ministry/all', userCtrl.getAllMinistry)
router.post("/follow", verifyToken, userCtrl.followUser);
router.post("/unfollow", verifyToken, userCtrl.UnFollowUser);
router.post("/bookmark", verifyToken, userCtrl.bookmarkPost);
router.post("/unbookmark", verifyToken, userCtrl.unBookmarkPost);
router.post("/:userId/update", verifyToken, userCtrl.updateUser)
router.post("/:userId/update/password", verifyToken, userCtrl.changePassword)


export default router;
