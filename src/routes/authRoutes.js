const express=require("express");
const {
    registerUser,
    loginUser,
    getAllUsers
} =require("../controllers/authController");

const { 
    protect,
    adminOnly} = require("../middleware/authMiddleware");

const {
    registerValidator,
    loginValidator
} = require("../validators/authValidator");

const validate = require("../middleware/validate");


const router=express.Router();

router.post(
    "/register",
    registerValidator,
    validate,
    registerUser);

router.post(
    "/login",
    loginValidator,
    validate,
    loginUser);

router.get("/users",
    protect,
    adminOnly,
    getAllUsers);

module.exports=router;
