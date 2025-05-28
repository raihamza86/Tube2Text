const axios = require("axios");

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

async function generateBlogTitle(transcript) {
    try {
        const cleanTranscript = transcript
            .substring(0, 1000)
            .replace(/\[.*?\]/g, '')
            .replace(/\b(in this video|watch the video|click the link)\b/gi, '');

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                inputs: `Generate a professional, SEO-optimized title (50-60 characters) about this technical topic: ${cleanTranscript}`,
                parameters: {
                    max_length: 60,
                    num_return_sequences: 1,
                    temperature: 0.7
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`
                }
            }
        );

        let title = response.data[0]?.summary_text || "Technical Guide";
        
        // Clean up title
        title = title.replace(/"/g, '')
                    .replace(/\.$/g, '')
                    .replace(/^how to/i, '')
                    .trim();
                    
        // Ensure proper length
        if (title.length > 65) {
            title = title.substring(0, 100) + '...';
        }
        
        return title;
    } catch (err) {
        console.error("Title generation failed, using fallback");
        return "Complete Technical Guide";
    }
}

module.exports = { generateBlogTitle };