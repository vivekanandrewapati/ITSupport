import { User } from "../models/user.model.js";



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "email and password both are required"
            })
        }

        const oldUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (!oldUser) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        const isPasswordCorrect = await oldUser.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "invalid password"
            })
        }
        const userData = { _id: oldUser._id, email: oldUser.email, role: oldUser.role };
        return res.status(200).json({
            success: true,
            message: "user logged in successfully",
            data: userData
        })


    } catch (error) {
        console.error("error in login", error);
        return res.status(500).json({
            success: false,
            message: "error in login",
            error: error.message
        })

    }
}

export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "email and password both are required"
            })
        }
        const oldUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (oldUser) {
            return res.status(400).json({
                success: false,
                message: "user with email already exists"
            })
        }

        const newUser = await User.create({
            email: email.toLowerCase().trim(),
            password: password,
            role
        })

        const userData = { _id: newUser._id, email: newUser.email, role: newUser.role };
        return res.status(201).json({
            success: true,
            message: "user registerd successfully",
            data: userData
        })
    } catch (error) {
        console.error("error in registration", error);
        return res.status(500).json({
            success: false,
            message: "error in registration",
            error
        })

    }
}