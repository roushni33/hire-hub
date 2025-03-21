import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res
            .status(401)
            .json(new ApiResponse(401, "User not authenticated"))
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
        return res.status(401).json(
            new ApiResponse(401, "Invlaid token")
        )
    }
    req.id = decode.userId;
    
    next();

})

export default isAuthenticated;