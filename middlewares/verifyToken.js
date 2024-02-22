const { errorHandler } = require('../utils/responseHandler');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(' ').pop();

    if (!token) return errorHandler(res, 401, 'Tidak ada token');

    try {
        const verfyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verfyToken;
        next();
    } catch (error) {
        return errorHandler(res, 401, 'Access Denied');
    }
}

module.exports = verifyToken;