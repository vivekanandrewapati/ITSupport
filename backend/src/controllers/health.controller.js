

export const healthController = async (req, res) => {

    return res.status(200).json({
        success: true,
        message: "IT Support API is running"
    })
}