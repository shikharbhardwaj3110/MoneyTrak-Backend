const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { validatePassword } = require("../middleware/bcryptMiddleware");
require("dotenv").config();

const createUser = async (req, res) => {
    try {
        const { username } = req.body;
        const newUser = new User({
            username,
            password: req.hashedPassword,
            data : {
                currentIncome : 0,
                expenses : []
            }
        });

        await newUser.save();
        const token = jwt.sign({ username }, process.env.PRIVATE_KEY);
        res.status(200).json({ token });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// USER-LOGIN

const validateUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const passwordCheck = await validatePassword(password, user.password);

        if (passwordCheck) {
            var token = jwt.sign({ username: user.username }, process.env.PRIVATE_KEY);
            res.status(200).json({ token });
        }
        else {
            return res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createUser, validateUser };