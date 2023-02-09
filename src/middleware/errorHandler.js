const AppError = require("../utils/AppError")

module.exports = (error, req, res, next) => {
    console.log(error)
    if(error instanceof AppError) {
        return res.status(error?.status || 500).json({
            message: error.message,
            status: error.status
        })
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({ message: error?.details?.length ? error.details[0]?.message : error.message });
    }

    else res.status(500).json({ message: 'Oops. Something went wrong. please try later.'})
}