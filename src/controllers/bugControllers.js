const Bug=require("../models/Bug");
const asyncHandler=require("../middleware/asyncHandler");

const {
    generateSummary,
    predictPriority,
    suggestFix
} = require("../services/ai/aiService");

const getAllBugs=asyncHandler(async (req,res)=>{
        const {status,priority,search, sort}=req.query;

        const page=Number(req.query.page) || 1;
        const limit=Number(req.query.limit)|| 5;
        const skip=(page-1)*limit;
    
        let query={
            createdBy:req.user._id
        };
    
        if(status){
            query.status=status;
        }
        if(priority){
            query.priority=
                priority.charAt(0).toUpperCase() +
                priority.slice(1).toLowerCase();
        }

        if(search){
            query.title={
                $regex: search,
                $options:"i"
            };
        }
        const bugs= await Bug.find(query)
            .sort(sort || "-createdAt")
            .skip(skip)
            .limit(limit);
    
        res.json(bugs);
     
});
    


const getBugById= asyncHandler( async (req,res)=>{
        const bug = await Bug.findOne({
            _id:req.params.id,
            createdBy: req.user._id
        })
        if(!bug){
            res.status(404);
            throw new Error("Bug not found");
        }
        res.json(bug);

});

const createBug= asyncHandler( async (req,res)=>{
        
        const bug = await Bug.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority ,
            
            createdBy:req.user._id
        });
        res.status(201).json(bug);
});

const updateBug= asyncHandler(async (req,res)=>{
    
        const bug=await Bug.findOneAndUpdate(
            {
                _id:req.params.id,
                createdBy: req.user._id
            },
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
});

const assignBug = asyncHandler(async (req, res) => {
    const { assignedTo, dueDate } = req.body;

    const bug = await Bug.findById(req.params.id);

    if (!bug) {
        res.status(404);
        throw new Error("Bug not found");
    }

    bug.assignedTo = assignedTo;
    bug.assignedAt = new Date();
    bug.dueDate = dueDate;

    await bug.save();

    res.json(bug);
});

const deleteBug= asyncHandler( async(req,res)=>{
    const bug=await Bug.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    });
    if(!bug){
        res.status(404);
        throw new Error("Bug not found");
    }

    await bug.deleteOne();

    res.json({
        message:"Bug deleted successfully"
    });
});

const generateBugSummary= asyncHandler(async(req,res)=>{
    const bug= await Bug.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    });

    if(!bug){
        res.status(404);
        throw new error("Bug not found");
    }

    const summary=await generateSummary(bug.description);

    bug.summary= summary;

    await bug.save();
    res.json(bug);
});

const suggestPriority= asyncHandler( async(req,res)=>{
    const bug=await Bug.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    });

    if(!bug){
        res.status(404);
        throw new Error("Bug not found");
    }

    const priority= await predictPriority(bug.description);

    bug.priority=priority;
    await bug.save();

    res.json(bug);
});

const suggestBugFix= asyncHandler(async(req,res)=>{
    const bug= await Bug.findOne({
        _id: req.params.id,
        createdBy: req.user._id
    });
    if(!bug){
        res.status(404);
        throw new Error("Bug not found");
    }

    const fix=await suggestFix(bug.description);

    bug.suggestedFix=fix;
    await bug.save();

    res.json(bug);
});

module.exports={
    getAllBugs,
    getBugById,
    createBug,
    updateBug,
    assignBug,
    deleteBug,
    generateBugSummary,
    suggestPriority,
    suggestBugFix
};