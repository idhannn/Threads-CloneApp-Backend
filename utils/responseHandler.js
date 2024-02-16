const errorHandler = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message: message
    })
}

const Success = (res, statusCode, message, result) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        result: result
    })
}

module.exports = {
    errorHandler,
    Success
}