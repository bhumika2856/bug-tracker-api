const {body}= require("express-validator");

const createBugValidator=[
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be in a string"),

    body("priority")
        .optional()
        .isIn(["Low", "Medium","High", "Critical"])
        .withMessage("Priority must be Low, Medium, High or Critical"),   
];

module.exports={
    createBugValidator
};