import express from "express";
import { registerUser, updateProfile, loginUser, logout } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/profile/update").post(isAuthenticated, updateProfile);
router.route("/logout").get(isAuthenticated, logout);

export default router;
// kya hua.. jaa rhe washroom > fir nahana > fir khana > bolo ab