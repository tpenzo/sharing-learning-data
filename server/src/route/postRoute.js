import express from "express";
import postController from "../controllers/postCtrl.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/newpost", verifyToken, postController.createPost);
router.post("/:postId/like", verifyToken, postController.likePost);
router.post("/:postId/unlike", verifyToken, postController.unLikePost);
router.put("/:postId/status", verifyToken, postController.updateStatusPost);
router.get("/:userId/user", verifyToken, postController.getUserPost);
router.delete("/:postId", verifyToken, postController.deletePost);
router.put("/:postId", verifyToken, postController.editPost);
router.get("/:id", verifyToken, postController.getPost);
router.get("/", verifyToken, postController.getAllPost);
router.get("/course/:courseId", verifyToken, postController.getCoursePost);

export default router;
