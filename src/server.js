const express = require("express");
const bugRoutes=require("./routes/bugRoutes");

const app = express();

app.use(express.json());

app.use("/bugs", bugRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});