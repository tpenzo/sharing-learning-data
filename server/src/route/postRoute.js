import express from "express";
import postController from "../controllers/postCtrl.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/newpost", verifyToken, postController.createPost);
router.post("/:postId/like", verifyToken, postController.likePost);
router.post("/:postId/unlike", verifyToken, postController.unLikePost);
router.get("/me", verifyToken, postController.getUserPost);
router.get("/:id", verifyToken, postController.getPost);
router.get("/", verifyToken, postController.getAllPost);

// router.post("/newpost", postController.createPost);
// router.post("/:postId/like", postController.likePost);
// router.post("/:postId/unlike", postController.unLikePost);
// router.get("/me", postController.getUserPost);
// router.get("/:id", postController.getPost);
// router.get("/", postController.getAllPost);

export default router;
