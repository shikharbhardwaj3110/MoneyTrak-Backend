const User = require("../models/UserModel");

const addExpense = async (req, res) => {
    try {
        const { username } = req.user;
        const newExpenses = JSON.parse(req.body.expenses);
        console.log(newExpenses);

        const updatedUserData = await User.findOneAndUpdate(
            { username: username },
            {
                $push: {
                    'data.expenses': { $each: newExpenses },
                },
            },
            { new: true }
        );
        if (!updatedUserData) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'Objects added successfully', updatedUserData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addExpense };