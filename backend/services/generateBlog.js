const axios = require("axios");

const COHERE_API_KEY = process.env.COHERE_API_KEY;

if (!COHERE_API_KEY) {
    throw new Error("COHERE_API_KEY is not defined in environment variables.");
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateBlog(transcript, retries = 3) {

    if (!transcript || typeof transcript !== "string") {
        throw new Error("Invalid transcript provided for blog generation.");
    }

    const prompt = `
Create a detailed blog post from the transcript below.

Transcript:
${transcript}

Blog Format:
## Introduction
...

## Requirements
...

## Step-by-Step Implementation
...

## Troubleshooting
...

## Conclusion
`;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.post(
                "https://api.cohere.ai/v1/chat",
                {
                    model: "command-r",
                    message: prompt,
                    temperature: 0.5,
                },
                {
                    headers: {
                        Authorization: `Bearer ${COHERE_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.data?.text) {
                throw new Error("No text returned from Cohere.");
            }

            return response.data.text;
        } catch (error) {
            const status = error.response?.status;

            if (status === 429 && attempt < retries) {
                console.warn(`Rate limited. Retrying in 10 seconds (Attempt ${attempt}/${retries})...`);
                await delay(10000);
            } else {
                console.error("Cohere API (Blog) Error:", error.response?.data || error.message);
                throw new Error("Failed to generate blog content from Cohere API.");
            }
        }
    }
    throw new Error("Exceeded maximum retries to generate blog.");
}

async function generateBlogTitle(transcript) {
    if (!transcript || typeof transcript !== "string") {
        throw new Error("Invalid transcript provided for title generation.");
    }

    const prompt = `
Based on the following transcript, generate a catchy, SEO-friendly blog title (no more than 12 words):

Transcript:
${transcript}

Title:
`;

    try {
        const response = await axios.post(
            "https://api.cohere.ai/v1/chat",
            {
                model: "command-r",
                message: prompt,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${COHERE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.data?.text) {
            throw new Error("No title returned from Cohere.");
        }

        return response.data.text.trim();
    } catch (error) {
        console.error("Cohere API (Title) Error:", error.response?.data || error.message);
        throw new Error("Failed to generate blog title from Cohere API.");
    }
}


module.exports = { generateBlog, generateBlogTitle };

