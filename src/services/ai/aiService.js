const {generateSummary}=require("./summaryService");
const {predictPriority} = require("./priorityService");
const { suggestFix } = require("./fixService");
module.exports={
    generateSummary,
    predictPriority,
    suggestFix
};

