import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"


const applyJob = asyncHandler(async (req, res) => {
    const userId = req.id;

    const jobId = req.params.id;
    if (!jobId) {
        throw new ApiError(400, "Job id is required.")
    }
    //  check whether it is already applied or not
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
        throw new ApiError(400, "Yov have already applied for this job")
    }
    // check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found")
    }
    // create a new application
    const newApplication = await Application.create({
        job: jobId,
        applicant: userId,
    })

    job.applications.push(newApplication.id)
    await job.save();
    return res.status(201)
        .json(new ApiResponse(201, { newApplication }, "Job applied successfully"))


})

const getAppliedJobs = asyncHandler(async (req, res) => {
    const userId = req.id;
    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
        path: 'job',
        options: { sort: { createdAt: -1 } },
        populate: ({
            path: 'company',
            options: { sort: { createdAt: -1 } }
        })
    });

    if (!application) {
        throw new ApiError(404, "No Applications ")
    }

    return res.status(200)
        .json(new ApiResponse(200, { application }))
})

// admin will know how many users have applied on a particular job posted by them
const getApplicants = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
        path: 'applications',
        options: { sort: { createdAt: -1 } },
        populate: ({
            path: 'applicant'
        })
    });

    if (!job) {
        throw new ApiError(404, "Job not found")
    }

    return res.status(200)
        .json(new ApiResponse(200, { job }))
})

const updateStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
        throw new ApiError(400, "status is required")
    }
    // find the application by application id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
        throw new ApiError(404, "Application not found")
    }

    // update the status
    application.status = status.toLowerCase()

    await application.save();
    return res.status(200)
        .json(new ApiResponse(200, { application }, "status updated successfully"));

})


export {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus,
}