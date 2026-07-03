const express=require("express");

const {
    getAllBugs,
    getBugById,
    createBug,
    updateBug
}= require("../controllers/bugControllers");

const router=express.Router();

router.get("/", getAllBugs);
router.get("/:id", getBugById);
router.post("/",createBug);
router.put("/:id", updateBug);

module.exports=router;