// aiService.js
const axios = require("axios");

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

async function generateBlogFromTranscript(transcript) {
    try {
        const prompt = `Generate a detailed SEO-optimized blog post based on this video transcript:\n\n${transcript}`;

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/google/flan-t5-xl",
            {
                inputs: prompt,
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                },
            }
        );

        const result = response.data;
        if (result.error) throw new Error(result.error);

        return result[0]?.generated_text || "Blog generation failed.";
    } catch (err) {
        console.error("Blog generation failed:", err.message);
        throw new Error("AI generation error.");
    }
}

module.exports = { generateBlogFromTranscript };
