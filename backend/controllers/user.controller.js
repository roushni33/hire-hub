import { User } from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import bcrypt from "bcrypt"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"



const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
        throw new ApiError(400, "All fields are required.")
    };
    const file = req.file;
    let profileUrl;
    if (file) {
        const cloudResponse = await uploadOnCloudinary(file.path);
        profileUrl = cloudResponse?.url;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User already exist with this email.")
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile: {
            profilePhoto: profileUrl,
        }

    })
    const createdUser = await User.findById(user._id).select("-password")


    return res.status(200).json(new ApiResponse(200, { createdUser }, "user registered successfully."))
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        throw new ApiError(400, "All fields are required.")
    };
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(400, "Incorrect email or password.")
    };

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(400, "Incorrect email or password.")
    };

    if (role !== user.role) {
        throw new ApiError(400, "Account does not exist with current role.")
    };

    const tokenData = {
        userId: user._id
    }

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
    const loginUser = await User.findById(user._id).select("-password")

    return res
        .status(200)
        .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'None' })
        .json(
            new ApiResponse(200, { loginUser }, `Welcome back ${user.fullName}.`

            )
        )



}
)

const logout = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .cookie("token", "", { maxAge: 0 })
        .json(
            new ApiResponse(200, "Logged out successfully.")
        )
})

const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    let pdfUrl;
    if (file) {
        const cloudResponse = await uploadOnCloudinary(file.path);
        pdfUrl = cloudResponse?.url;
    }



    let skillsArray;
    if (skills) {
        skillsArray = skills.split(",");
    }

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
        return res
            .status(400)
            .json(
                new ApiResponse(400, "User not found.")
            )
    }

    if (fullName) user.fullName = fullName
    if (email) user.email = email
    if (phoneNumber) {
        user.phoneNumber = parseInt(phoneNumber)
    }
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skillsArray



    if (file) {
        user.profile.resume = pdfUrl //save the cloudinary url
        user.profile.resumeOriginalName = file.originalname //save the orignal file name
    }



    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, { user }, "Profile updated successfully.")
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {

    const token = req.cookies.token;
    if (!token) {
        throw new ApiError(401, "Not authenticated");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, { user }, "User authenticated"));

});



export {
    registerUser,
    loginUser,
    logout,
    updateProfile,
    getCurrentUser
}