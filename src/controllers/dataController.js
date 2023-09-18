const User = require("../models/UserModel");

const addExpense = async (req, res) => {
    try {
        const { username } = req.user;
        const newExpenses = JSON.parse(req.body.expenses);

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
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateCurrentIncome = async (req, res) => {
    try {
        const { username } = req.user;
        const { newIncome } = req.body;
        const updatedUserData = await User.findOneAndUpdate(
            { username },
            { $set: { 'data.currentIncome': newIncome } },
            { new: true }
        );
        if (!updatedUserData) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'Income updated successfully', updatedUserData });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { username } = req.user;
        const { newCategory, newAmount, expenseId } = req.body;

        const updatedUserData = await User.findOneAndUpdate(
            { username, 'data.expenses._id': expenseId },
            {
              $set: {
                'data.expenses.$.category': newCategory,
                'data.expenses.$.amount': newAmount,
              },
            },
            { new: true }
          );
      
          if (!updatedUserData) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          return res.status(200).json({ message: 'Expense updated successfully', updatedUserData });
    }
    catch(err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { addExpense, updateCurrentIncome, updateExpense };