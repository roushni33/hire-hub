import { Job } from "../models/job.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Company } from "../models/company.model.js"


const postJob = asyncHandler(async (req, res) => {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;
    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
        throw new ApiError(400, "All fields are required")
    }

    const company = await Company.findById(companyId);
    if (!company) {
        throw new ApiError(400, "Invalid companyId: Company does not exist");
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
        company: company._id,
        Created_by: userId
    })
    return res
        .status(201)
        .json(new ApiResponse(201, { createdJob }, "New job created successfully"))
})

const getAllJob = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword || "";

    const query = {

        $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ]

    };

    const jobs = await Job.find(query).populate("company","name").sort({ createdAt: -1 });

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
    const jobs = await Job.find({ created_by: adminId }).populate({
        path:'company'
    })
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