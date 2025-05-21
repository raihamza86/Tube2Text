const axios = require("axios");

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

async function generateBlogTitle(transcript) {
    try {
        const cleanTranscript = transcript
            .substring(0, 1000)
            .replace(/\[.*?\]/g, '')
            .replace(/\b(in this video|watch the video)\b/gi, '');

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                inputs: `Generate a concise, SEO-friendly title under 60 characters about: ${cleanTranscript}`,
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

        let title = response.data[0]?.summary_text || "Technical Guide";
        return title.replace(/"/g, '').replace(/\.$/g, '').trim();
    } catch (err) {
        console.error("Title generation failed, using fallback");
        return "Complete Technical Implementation Guide";
    }
}

module.exports = { generateBlogTitle };