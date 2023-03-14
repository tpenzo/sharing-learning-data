import express from "express";
const router = express.Router();
import authRoute from "./authRoute.js";
import chatRoute from "./chatRoute.js";
import messageRoute from "./messageRoute.js";
import coursesRoute from "./coursesRoute.js";
import userRoute from "./userRoute.js";
import postRoute from "./postRoute.js";

router.use("/auth", authRoute);
router.use("/chat", chatRoute);
router.use("/message", messageRoute);
router.use("/user", userRoute);
router.use("/courses", coursesRoute);
router.use("/post", postRoute);

export default router;
