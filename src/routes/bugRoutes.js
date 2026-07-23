const express=require("express");
const {createBugValidator}=require("../validators/bugValidator");
const validate=require("../middleware/validate");
const {protect, adminOnly} =require("../middleware/authMiddleware");


const {
    getAllBugs,
    getBugById,
    createBug,
    updateBug,
    assignBug,
    deleteBug,
    generateBugSummary,
    suggestPriority,
    suggestBugFix
}= require("../controllers/bugControllers");

const router=express.Router();

router.get("/", protect, getAllBugs);
router.get("/:id", protect, getBugById);
router.post("/",protect,createBugValidator,validate,createBug);
router.put("/:id", protect, updateBug);
router.put("/:id/assign", protect, adminOnly, assignBug);
router.delete("/:id", protect, deleteBug);
router.post(
    "/:id/generate-summary",
    protect,
    generateBugSummary
);
router.post(
    "/:id/suggest-priority",
    protect,
    suggestPriority
);

router.post(
    "/:id/suggest-fix",
    protect,
    suggestBugFix
);
module.exports=router;