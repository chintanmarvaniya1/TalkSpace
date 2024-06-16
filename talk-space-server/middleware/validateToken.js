const jwt = require("jsonwebtoken");
const USER = require("../models/UserModel");

const validateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, authorization denied.',
                tokenExpired: true,
            });
        }
        
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        if (!verified) {
            return res.status(401).json({
                success: false,
                message: 'Token verification failed, authorization denied.',
                tokenExpired: true,
            });
        }
        req.userID = verified.id;
        next();
    } catch (error) {
        return res.status(503).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

module.exports = validateToken;