const express = require('express');
const bcryptMiddleware = require('../middleware/bcryptMiddleware');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/register', bcryptMiddleware.hashPassword, authController.createUser);

router.post('/login', authController.validateUser);

router.get('/protected', jwtMiddleware, (req, res) => {
    res.status(200).json({ message: 'Authenticated route', user: req.user });
});

module.exports = router;