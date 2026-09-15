import { User } from "../models/user.model.js";
import { verifyToken } from "../utils/jwt.js";


export const userAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "authorization token is required"
            })
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = await verifyToken(token);
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "invalid token"
            })
        }

        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not found"
            })
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("error in user auth middleware:", error);
        return res.status(401).json({
            success: false,
            message: "invalid token or authorization failed"
        })
    }

}

