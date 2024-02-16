const User = require("../models/userModel");
const { errorHandler, Success } = require("../utils/responseHandler");

const userById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        const { password, ...rest } = user._doc;

        if (!id) return errorHandler(res, 404, "User Tidak Ditemukan");

        return Success(res, 200, "User Ditemukan", { ...rest })
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

module.exports = {
    userById
}