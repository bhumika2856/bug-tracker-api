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
            enum:["Low", "Medium", "High", "Critical"],
            default:"Medium"
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("Bug", bugSchema);