const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const DynamicExpensesSchema = new mongoose.Schema({}, { strict: false });

const userSchema = new mongoose.Schema({
    username :  {
        type : String,
        required : true,
        unique : true
    },
    password :  {
        type : String,
        required : true
    },
    data : {
        currentIncome : {
            type : Number,
        },
        expenses : [
            {
                category : String,
                amount : Number
            }
        ]
    }
});

const UserData = mongoose.model('UserData', userSchema, "UserData");

module.exports = UserData;