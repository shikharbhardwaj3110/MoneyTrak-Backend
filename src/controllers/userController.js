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

exports.insertUser = async (req, res, next) => {
    try {
        const {username, password, data} = req.body;
        const financialData = JSON.parse(data);
        const newUser = new User({
            username,
            password,
            data : financialData
        });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(err) {
        console.log("Error inserting user : ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

