import express from "express";
import { registerUser, updateProfile, loginUser, logout, getCurrentUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/registerUser").post(upload.single("file"), registerUser);
router.route("/loginUser").post(loginUser);
router.route("/profile/update").post(isAuthenticated, upload.single("file"), updateProfile);
router.route("/logout").get(isAuthenticated, logout);
router.get('/getCurrentUser', getCurrentUser);

export default router;
