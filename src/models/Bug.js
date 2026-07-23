const mongoose=require("mongoose");

const bugSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            default:""
        },
        status:{
            type:String,
            enum:["Open", "In Progress", "Closed"],
            default:"Open"
        },
        priority:{
            type:String,
            enum:["Low", "Medium", "High", "Critical"]
            
        },
        summary:{
            type: String
        },
        suggestedFix:{
            type:String
        },
        
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        assignedTo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        dueDate: {
            type: Date
        }
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("Bug", bugSchema);