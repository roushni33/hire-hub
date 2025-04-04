import express from "express";
import { registerUser, updateProfile, loginUser, logout } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/registerUser").post(upload.single("file"), registerUser);
router.route("/loginUser").post(loginUser);
router.route("/profile/update").post(isAuthenticated, upload.single("file"), updateProfile);
router.route("/logout").get(isAuthenticated, logout);

export default router;
