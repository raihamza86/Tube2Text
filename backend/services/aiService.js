const axios = require("axios");

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

async function generateBlogFromTranscript(transcript) {
    try {
        // Clean transcript first
        const cleanTranscript = cleanRawTranscript(transcript);

        const response = await axios.post(
            HF_API_URL,
            {
                inputs: `Create a detailed technical guide about "${extractMainTopic(cleanTranscript)}" with these sections:
                
                ## Introduction
                ## Requirements
                ## Step-by-Step Implementation
                ## Troubleshooting
                ## Conclusion
                
                Write in professional tone without video references. Use technical terms accurately.
                
                Content: ${cleanTranscript.substring(0, 4000)}`,
                parameters: {
                    max_length: 1500,
                    min_length: 800,
                    temperature: 0.5,
                    do_sample: false
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 45000
            }
        );

        if (!response.data || !response.data[0]?.summary_text) {
            throw new Error("Invalid response from AI service");
        }

        return postProcessContent(response.data[0].summary_text);
    } catch (err) {
        console.error("Generation Error:", {
            message: err.message,
            status: err.response?.status
        });
        throw new Error("Failed to generate quality content. Please try a different video.");
    }
}

function cleanRawTranscript(text) {
    return text
        .replace(/\[.*?\]/g, '')
        .replace(/\b(like and subscribe|in this video|watch the video|click the link)\b/gi, '')
        .replace(/(http|https):\/\/[^\s]+/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractMainTopic(text) {
    const firstSentence = text.split('.')[0];
    return firstSentence.replace(/how to/i, '').replace(/i will teach you/i, '').trim();
}

function postProcessContent(text) {
    return text
        .replace(/##\s+/g, '\n## ')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/Transform this YouTube transcript into a professional blog post/gi, '')
        .replace(/CNN\.com|CNN iReport|@cnnireport/gi, '')
        .trim();
}

module.exports = { generateBlogFromTranscript };