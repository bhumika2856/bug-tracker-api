const axios= require("axios");


const predictPriority= async (description)=>{
    const response= await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            contents:[
                {
                    parts:[
                        {
                            text:`You are a software QA expert.
                            Based on the bug description,return only one of these words:
                            Low
                            Medium
                            High
                            Critical
                            Do not explain your answer.
                            
                            Bug Description:
                            ${description}`
                        }
                    ]
                }
            ]
        }

    );
    return response.data.candidates[0].content.parts[0].text.trim();
    
};

module.exports={
    predictPriority
};