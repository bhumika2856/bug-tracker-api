const express = require("express");

const app = express();

app.use(express.json());

const bugs= [
  {
    id:1,
    title:"Login pgase crashes",
    status:"Open"
  },
  {
    id:2,
    title: "Profile image not loading",
    status:"In Progress"
  }
];

app.get("/", (req, res) => {
  res.send("Bug Tracker API Running");
});

app.get("/bugs", (req,res) =>{
  res.json(bugs);
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});