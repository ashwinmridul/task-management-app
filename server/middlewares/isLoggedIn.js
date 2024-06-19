const { verifyToken } = require("../utils/jwtHelper");

module.exports = (req, res, next) => {
    const token = req.headers?.token;
    verifyToken(token, (err, decoded) => {
        if (err) return res.status(401).json({message: 'Session invalid. Please re-login.'});

        req.user = decoded;
        next();
    });
};