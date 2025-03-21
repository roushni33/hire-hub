import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJob, getJobById, postJob } from "../controllers/job.controller.js";
const router = express.Router();
router.use(isAuthenticated)
router.route("/post").post(postJob);
router.route("/get").get(getAllJob); 
router.route("/getAdminJobs").get(getAdminJobs);
router.route("/get/:id").get(getJobById);


export default router; 