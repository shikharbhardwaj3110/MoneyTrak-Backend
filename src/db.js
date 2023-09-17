const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
    try {
        const connectionString = process.env.DATABASE_URII;
        await mongoose.connect(connectionString);
        console.log("Connected to database !");
    }
    catch(err) {
        console.log("Error connecting to MongoDB Server : ", err);
    }
};

module.exports = connectToDatabase;