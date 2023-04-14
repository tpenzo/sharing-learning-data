import express from "express";
import documentController from "../controllers/documentCtrl.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:courseId/course", verifyToken, documentController.getCourseDoc);
router.get("/:userId", verifyToken, documentController.getUserDoc);
router.delete("/:docId", verifyToken, documentController.deleteDoc);
router.get("/", verifyToken, documentController.getAllDocument);

export default router;
