const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.get("/", (req, res) => {
  res.send("uber clone");
});
app.use("/users", userRoutes);

module.exports = app;
