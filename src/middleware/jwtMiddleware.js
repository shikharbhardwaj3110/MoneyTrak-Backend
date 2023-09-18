const jwt = require('jsonwebtoken');
require("dotenv").config();

const jwtAuthMiddleware = (req, res, next) => {
    const bearerToken = req.header('Authorization');
    const token = bearerToken.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'No token found ! Validation failed.' });
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = jwtAuthMiddleware;