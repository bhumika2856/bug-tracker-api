const axios = require("axios");

const generateSummary = async (description) => {
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            contents: [
                {
                    parts: [
                        {
                            text: `Summarize the following software bug in two concise sentence. Do not add extra explanation.\n\nBug Description:\n${description}`
                        }
                    ]
                }
            ]
        }
    );

    return response.data.candidates[0].content.parts[0].text.trim();
};

module.exports = {
    generateSummary
};