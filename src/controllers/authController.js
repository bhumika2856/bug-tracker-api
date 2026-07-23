const bycrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const asyncHandler=require("../middleware/asyncHandler");

const generateToken=(id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );
};

const registerUser= asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const existingUser= await User.findOne({email});
    if(existingUser){
        res.status(400);
        throw new Error("user already exists");
    }
    const hashedPassword= await bycrypt.hash(password,10);

    const user=await User.create({
        name,
        email,
        password:hashedPassword
    });
    res.status(201).json({
        message:"User registered successfully",
        token: generateToken(user._id),
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    });
});

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
        res.status(401);
        throw new Error("Invalid email or password");
    }
    const isMatch=await bycrypt.compare(password, user.password);

    if (!isMatch){
        res.status(401);
        throw new Error("Invalid email or password");
    }
    res.json({
        message:"Login successful",
        token: generateToken(user._id),
        user:{
            id:user._id,
            name: user.name,
            email:user.email,
            role: user.role
        }
    });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, "name email role");

    res.json(users);
});

module.exports={
    registerUser,
    loginUser,
    getAllUsers
};