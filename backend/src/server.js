import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const startserver = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`server started on port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("failed to start the server")
    }
}

startserver();