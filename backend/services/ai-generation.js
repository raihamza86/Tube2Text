const OpenAI = require('openai');

module.exports = async (transcript, options) => {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const prompt = `
    Convert this YouTube transcript into a well-structured blog post:
    
    Requirements:
    - Tone: ${options.tone}
    - Length: ${options.length} (${options.length === 'short' ? '300-500 words' : '800-1200 words'})
    - Use markdown formatting
    - Include 3-5 subheadings (## Heading)
    - Add bullet points for key takeaways
    
    Transcript:
    ${transcript.substring(0, 12000)} // Truncate to avoid token limits
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
    });

    return response.choices[0].message.content;
};