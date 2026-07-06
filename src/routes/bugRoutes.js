const express=require("express");
const {createBugValidator}=require("../validators/bugValidator");
const validate=require("../middleware/validate");
const {protect} =require("../middleware/authMiddleware");

const {
    getAllBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug
}= require("../controllers/bugControllers");

const router=express.Router();

router.get("/", protect, getAllBugs);
router.get("/:id", getBugById);
router.post("/",protect,createBugValidator,validate,createBug);
router.put("/:id", updateBug);
router.delete("/:id", protect, deleteBug);

module.exports=router;