const axios = require("axios");

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

async function generateBlogFromTranscript(transcript) {
    try {
        // Craft a better prompt with specific instructions
        const prompt = `
        Transform this YouTube transcript into a professional blog post with these sections:
        
        1. Introduction explaining the main concept
        2. Step-by-step guide (with clear instructions)
        3. Implementation tips
        4. Conclusion summarizing key points
        
        Requirements:
        - Remove all video-specific references ("in this video", "watch the video")
        - Use professional tone
        - Keep technical details accurate
        - Format as Markdown with headings
        
        Transcript: ${transcript.substring(0, 5000)}
        `;

        const response = await axios.post(
            HF_API_URL,
            {
                inputs: prompt,
                parameters: {
                    max_length: 1000,
                    min_length: 500,
                    do_sample: true,
                    temperature: 0.7
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 30000
            }
        );

        if (!response.data || !response.data[0]?.summary_text) {
            throw new Error("Invalid response from AI service");
        }

        return formatBlogContent(response.data[0].summary_text);
    } catch (err) {
        console.error("Generation Error:", err);
        throw new Error("Content generation failed. Please try a different video.");
    }
}

function formatBlogContent(text) {
    // Advanced cleaning and formatting
    return text
        .replace(/\[(Music|Applause|.*?)\]/g, '')
        .replace(/\b(in this video|like and subscribe|watch the video|click the link)\b/gi, '')
        .replace(/\n+/g, '\n\n')
        .replace(/## /g, '\n## ')  // Ensure proper heading spacing
        .replace(/(http|https):\/\/[^\s]+/g, '')  // Remove URLs
        .replace(/\s+/g, ' ')
        .trim();
}

module.exports = { generateBlogFromTranscript };