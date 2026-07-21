const express = require("express");
const cors = require("cors");

const bugRoutes = require("./routes/bugRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/bugs", bugRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

module.exports = app;