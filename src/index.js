const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectToDatabase = require("./db");
const userRouter = require("./routes/userRoutes");

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

connectToDatabase();

app.use("/users", userRouter);

app.listen(port, () => {
    console.log("Server running on port : ", port);
})