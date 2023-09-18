const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (req, res, next) => {
    try {
        const { password : plainTextPassword } = req.body;
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
        req.hashedPassword = hashedPassword;
        next();
    }
    catch(err) {
        next(err);
    }
};

const validatePassword = async (plainTextPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }
    catch(err) {
        throw err;
    }
};

module.exports = { hashPassword, validatePassword };