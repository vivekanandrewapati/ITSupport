import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = async (user) => {

    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
}

export const verifyToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}