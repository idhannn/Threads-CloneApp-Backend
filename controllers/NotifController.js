const Notifications = require("../models/notifModel");
const { errorHandler, Success } = require("../utils/responseHandler");

const getNotifications = async (req, res) => {
    try {
        const userWhoPosted = req.user.username;

        if (!userWhoPosted) {
            return errorHandler(res, 404, "User not found");
        }

        const notifications = await Notifications.find({ userWhoPosted });

        return Success(res, 200, "Notifications", notifications);
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

module.exports = {
    getNotifications,
}