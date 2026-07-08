const axios = require("axios");

const suggestFix = async (description) => {
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            contents: [
                {
                    parts: [
                        {
                            text: `You are an experienced software engineer.

Read the following bug description.

Return your answer in EXACTLY this format:

Possible Cause:
<one or two concise sentences>

Suggested Fix:
<one or two concise sentences>

Do not use markdown.
Do not use bullet points.
Keep the total response under 80 words.

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

module.exports = {
    suggestFix
};