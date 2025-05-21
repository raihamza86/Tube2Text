const axios = require("axios");

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

async function generateBlogTitle(transcript) {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                inputs: `Generate a concise, SEO-friendly title for this content: ${transcript.substring(0, 2000)}`,
                parameters: {
                    max_length: 60,
                    num_return_sequences: 1
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`
                }
            }
        );

        return response.data[0]?.summary_text || "How to Get Google Maps API Key";
    } catch (err) {
        console.error("Title generation failed, using default");
        return "Complete Guide to Google Maps API";
    }
}

module.exports = { generateBlogTitle };