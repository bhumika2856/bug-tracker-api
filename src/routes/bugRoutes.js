const express=require("express");

const router=express.Router();

const bugs = [
    {
        id: 1,
        title: "Login page crashes",
        status: "Open",
        priority: "High",
        createdAt: new Date()
    },
    {
        id: 2,
        title: "Profile image not loading",
        status: "In Progress",
        priority: "Medium",
        createdAt: new Date()
    }
];

router.get("/",(req,res)=>{

    const {status}=req.query;
    if (status){

        const filteredBugs=bugs.filter(
            (bug)=> bug.status.toLowerCase()==status.toLowerCase());
        return res.json(filteredBugs);
    }
    res.json(bugs);
});

router.get("/:id",(req,res)=>{
    const bugId=parseInt(req.params.id);

    const bug = bugs.find((b) => b.id === bugId);

    if (!bug) {
        return res.status(404).json({
            message: "Bug not found"
        });
    }

    res.json(bug);
});

router.post("/", (req, res) => {
    const newBug = {
        id: bugs.length + 1,
        title: req.body.title,
        status: "Open",
        priority: req.body.priority || "Medium",
        createdAt: new Date()
    };

    bugs.push(newBug);

    res.status(201).json(newBug);
});

router.put("/:id", (req, res) => {
    const bugId = parseInt(req.params.id);

    const bug = bugs.find((b) => b.id === bugId);

    if (!bug) {
        return res.status(404).json({
            message: "Bug not found"
        });
    }

    bug.title = req.body.title || bug.title;
    bug.status = req.body.status || bug.status;
    bug.priority = req.body.priority || bug.priority;

    res.json(bug);
});



module.exports=router;