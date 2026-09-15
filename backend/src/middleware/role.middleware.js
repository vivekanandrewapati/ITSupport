
export const roleMiddleware = (...roles) => {

    return ((req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "you are not authorized to access this resource"
            })
        }
        next();
    })
}