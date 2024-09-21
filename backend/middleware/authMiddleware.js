import jwt from "jsonwebtoken"
import asyncHandler from "./asyncHandler.js"
import User from "../models/userModel.js"

// Protect routes
const protect = asyncHandler(async(req, res, next) => {
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt

    // authentication
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // new property .user for req for global route access (has id, name, email, isAdmin except password)
            req.user = await User.findById(decoded.userId).select('-password')
            next(); //proceed with next route handler or middleware
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

// Admin middleware
const admin = (req, res, next) => {
   if(req.user && req.user.isAdmin) {
    next(); //next middleware or route handler
   } else {
    res.status(401);
    throw new Error('Not Authorized as admin')
   }
}

export { protect, admin };