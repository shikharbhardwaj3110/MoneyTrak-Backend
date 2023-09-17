const User = require("../models/UserModel");

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch(err) {
        console.log("Error fetching all users : ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

