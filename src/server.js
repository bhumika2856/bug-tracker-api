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

app.get("/bugs/:id", (req, res) => {
  const bugId = parseInt(req.params.id);

  const bug = bugs.find((b) => b.id === bugId);

  if (!bug) {
    return res.status(404).json({
      message: "Bug not found"
    });
  }

  res.json(bug);
});

app.post("/bugs", (req,res)=>{
  const newBug={
    id:bugs.length+1,
    title:req.body.title,
    status:"Open"
  };

  bugs.push(newBug);
  res.status(201).json(newBug);
});

app.put("/bugs/:id", (req, res) => {
  const bugId = parseInt(req.params.id);

  const bug = bugs.find((b) => b.id === bugId);

  if (!bug) {
    return res.status(404).json({
      message: "Bug not found"
    });
  }

  bug.title = req.body.title || bug.title;
  bug.status = req.body.status || bug.status;

  res.json(bug);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});