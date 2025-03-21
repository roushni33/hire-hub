import express from "express";
import { registerCompany, getCompany, getCompanyById, updateCompanyInfo } from "../controllers/company.controller.js"

import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.use(isAuthenticated)
router.route("/registerCompany").post(registerCompany);
router.route("/get").get(getCompany);
router.route("/get/:id").get(getCompanyById);
router.route("/update/:id").put(updateCompanyInfo);

export default router;