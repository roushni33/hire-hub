import { Company } from "../models/company.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const registerCompany = asyncHandler(async (req, res) => {
    const { companyName } = req.body;
    if (!companyName) {
        throw new ApiError(400, "Company name is required.")
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
        throw new ApiError(400, "You can't register same company.")
    }

    company = await Company.create({
        name: companyName,
        userId: req.id
    })

    return res
        .status(201)
        .json(new ApiResponse(201, { company }, "Company registered successfully."))


})

const getCompany = asyncHandler(async (req, res) => {
    const userId = req.id;

    const companies = await Company.find({ userId });
    if (!companies) {
        throw new ApiError(404, "Companies not found.")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { companies }))
})

const getCompanyById = asyncHandler(async (req, res) => {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);
    if (!company) {
        throw new ApiError(404, "Company not found.")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { company }))
})

const updateCompanyInfo = asyncHandler(async (req, res) => {
    const { name, description, website, location } = req.body;

    const file = req.file;
    let logo = null;

    if (file) {
        const cloudResponse = await uploadOnCloudinary(file.path);
        logo = cloudResponse?.secure_url || null;
    }

    const updateData = { name, description, website, location };
    if (logo) updateData.logo = logo;




    const company = await Company.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
    );

    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    return res.status(200).json(new ApiResponse(200, company, "Company information updated."));
});








export {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompanyInfo
}