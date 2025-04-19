import { Job } from "../models/job.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"


const postJob = asyncHandler(async (req, res) => {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;
    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
        throw new ApiError(400, "All fields are required")
    }

    const createdJob = await Job.create({
        title,
        description,
        requirements: requirements.split(","),
        salary: Number(salary),
        location,
        jobType,
        experience: experience,
        position,
        company: companyId,
        Created_by: userId
    })
    return res
        .status(201)
        .json(new ApiResponse(201, "New job created successfully", { createdJob }))
})

const getAllJob = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword || "";

    const query = {

        $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ]

    };

    const jobs = await Job.find(query).populate({
        path: "company"
    }).sort({ createdAt: -1 });

    if (!jobs) {
        throw new ApiError(404, "Job not found.")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { jobs }))
})

const getJobById = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("applications");
    if (!job) {
        throw new ApiError(404, "Job not found.")
    }

    return res.status(200)
        .json(new ApiResponse(200, { job }))
})

const getAdminJobs = asyncHandler(async (req, res) => {
    const adminId = req.userId;
    const jobs = await Job.find({ created_by: adminId })
    if (!jobs) {
        throw new ApiError(404, "Jobs not found")
    }

    return res.status(200)
        .json(new ApiResponse(200, { jobs }))
})


export {
    postJob,
    getAllJob,
    getJobById,
    getAdminJobs,
}