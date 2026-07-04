const Bug=require("../models/Bug");




const getAllBugs=async (req,res)=>{
    try{

        const {status}=req.query;
    
        let query={};
    
        if(status){
            query.status=status;
        }
        const bugs= await Bug.find(query);
    
        res.json(bugs);
    } catch (error){
        res.status(500).json({
            message: error.message
        });
    }
};

const getBugById= async (req,res)=>{
    try{

        const bugId=parseInt(req.params.id);
        if(!bug){
            return res.status(404).json({
                message:"Bug not found :("
            });
        }
        res.json(bug);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }

};

const createBug= async (req,res)=>{
    try{

        const bug = await Bug.create({
            
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority || "Medium",
        });
        res.status(201).json(bug);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const updateBug= async (req,res)=>{
    try{
        const bug=await Bug.findByIdAndUpdate(
            req.params.id,
            {
                title:req.body.title,
                description:req.body.description,
                status: req.body.status,
                priority: req.body.priority
            },
            {
                new:true,
                runValidators: true
            }
        );

        if(!bug){
            return res.status(404).json({
                message:"Bug not found :("
            });
        }
        res.json(bug);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports={
    getAllBugs,
    getBugById,
    createBug,
    updateBug
};