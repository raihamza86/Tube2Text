const axios = require("axios");

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

async function generateBlogFromTranscript(transcript) {
    try {
        const cleanTranscript = cleanRawTranscript(transcript);
        const mainTopic = extractMainTopic(cleanTranscript);

        // Generate content with more controlled prompts
        const sections = await generateAllSections(cleanTranscript, mainTopic);

        // Apply aggressive post-processing
        return formatFinalContent(sections, mainTopic);
    } catch (err) {
        console.error("Generation Error:", err.message);
        throw new Error("Failed to generate quality content. Please try a different video.");
    }
}

async function generateAllSections(transcript, mainTopic) {
    // Generate sections sequentially to maintain context
    return {
        introduction: await generateSection({
            name: "introduction",
            instruction: `Write a 3-4 sentence professional introduction about ${mainTopic} focusing on its purpose and benefits.`,
            transcript,
            maxLength: 200
        }),
        requirements: await generateSection({
            name: "requirements",
            instruction: `Create a bulleted list of exactly what's needed to accomplish ${mainTopic}. Include only essential items.`,
            transcript,
            maxLength: 150
        }),
        implementation: await generateSection({
            name: "implementation",
            instruction: `Provide detailed, numbered steps to complete ${mainTopic}. Each step should begin with an action verb.`,
            transcript,
            maxLength: 600
        }),
        troubleshooting: await generateSection({
            name: "troubleshooting",
            instruction: `List potential issues and solutions for ${mainTopic} as bullet points in format "Problem: Solution"`,
            transcript,
            maxLength: 300
        }),
        conclusion: await generateSection({
            name: "conclusion",
            instruction: `Write a 2-3 sentence professional conclusion summarizing ${mainTopic} and its value.`,
            transcript,
            maxLength: 150
        })
    };
}

async function generateSection({ name, instruction, transcript, maxLength }) {
    try {
        const prompt = `${instruction}\n\nRelevant information: ${transcript.substring(0, 2000)}`;

        const response = await axios.post(
            HF_API_URL,
            {
                inputs: prompt,
                parameters: {
                    max_length: maxLength,
                    temperature: 0.3,
                    no_repeat_ngram_size: 2
                }
            },
            {
                headers: { Authorization: `Bearer ${HF_API_KEY}` },
                timeout: 30000
            }
        );

        return cleanGeneratedText(response.data[0]?.summary_text || "", name);
    } catch (err) {
        console.warn(`Failed to generate ${name}, using fallback`);
        return getFallbackContent(name);
    }
}

function cleanGeneratedText(text, sectionName) {
    // Remove any remaining instructions or special tokens
    let cleaned = text
        .replace(/["']/g, '')
        .replace(/^(write|list|provide)/i, '')
        .replace(/\b(in this video|click here|watch|subscribe)\b/gi, '')
        .replace(/\[.*?\]/g, '')
        .replace(/\n+/g, '\n')
        .trim();

    // Section-specific cleaning
    switch (sectionName) {
        case 'requirements':
        case 'troubleshooting':
            cleaned = cleaned.replace(/^[•*-]\s*/gm, '- ')
                .replace(/^\d+\.\s*/gm, '- ');
            break;
        case 'implementation':
            cleaned = cleaned.replace(/^(\d+\.)/gm, '\n$1')
                .replace(/^[•*-]\s*/gm, '1. ');
            break;
    }

    return cleaned;
}

function getFallbackContent(sectionName) {
    const fallbacks = {
        introduction: "This guide explains an important technical process.",
        requirements: "- Computer with internet access\n- Modern web browser",
        implementation: "1. Prepare your environment\n2. Follow the standard procedure\n3. Verify your results",
        troubleshooting: "- Problem: Action fails\n  Solution: Check requirements and try again",
        conclusion: "This completes our technical guide."
    };
    return fallbacks[sectionName];
}

function formatFinalContent(sections) {
    return `## Introduction\n${sections.introduction}\n\n` +
        `## Requirements\n${sections.requirements}\n\n` +
        `## Step-by-Step Implementation\n${sections.implementation}\n\n` +
        `## Troubleshooting\n${sections.troubleshooting}\n\n` +
        `## Conclusion\n${sections.conclusion}`;
}

function cleanRawTranscript(text) {
    return text
        .replace(/\[.*?\]/g, '') // Remove [music], [applause] etc
        .replace(/\b(like and subscribe|in this video|watch the video|click the link|don't forget to)\b/gi, '')
        .replace(/(http|https):\/\/[^\s]+/g, '') // Remove URLs
        .replace(/\s+/g, ' ') // Collapse multiple spaces
        .replace(/[^\w\s.,;:!?()-]/g, '') // Remove special chars except basic punctuation
        .trim();
}

function extractMainTopic(text) {
    // Get first meaningful sentence
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    if (sentences.length === 0) return "Technical Guide";

    const firstSentence = sentences[0];
    return firstSentence
        .replace(/\b(how to|i will teach you|in this tutorial|today we're)\b/gi, '')
        .replace(/,/g, '')
        .trim();
}

module.exports = { generateBlogFromTranscript };