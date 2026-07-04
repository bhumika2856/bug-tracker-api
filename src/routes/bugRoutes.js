const express=require("express");
const {createBugValidator}=require("../validators/bugValidator");
const validate=require("../middleware/validate");

const {
    getAllBugs,
    getBugById,
    createBug,
    updateBug
}= require("../controllers/bugControllers");

const router=express.Router();

router.get("/", getAllBugs);
router.get("/:id", getBugById);
router.post("/",createBugValidator,validate,createBug);
router.put("/:id", updateBug);

module.exports=router;