const express=require("express");
const bugRoutes=require("./routes/bugRoutes");
const errorHandler=require("./middleware/errorHandler");

const app=express();

app.use(express.json());
app.use("/bugs", bugRoutes);

app.use(errorHandler);

module.exports= app;