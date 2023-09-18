const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectToDatabase = require("./db");
const authRouter = require("./routes/authRoutes");
const dataRouter = require("./routes/dataRoutes");

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

connectToDatabase();

app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);

app.listen(port, () => {
    console.log("Server running on port : ", port);
})