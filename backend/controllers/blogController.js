const Blog = require("../models/Blog");
const { getVideoTranscript } = require("../services/youtubeService");
const { generateBlogFromTranscript } = require("../services/aiService");
const { generateBlogTitle } = require("../services/titleService");

exports.createBlog = async (req, res) => {
    try {
        const { videoUrl } = req.body;

        // Validate URL
        if (!videoUrl || !videoUrl.includes('youtube.com')) {
            return res.status(400).json({ error: "Please provide a valid YouTube URL" });
        }

        const transcript = await getVideoTranscript(videoUrl);
        const [blogContent, title] = await Promise.all([
            generateBlogFromTranscript(transcript),
            generateBlogTitle(transcript)
        ]);

        const blog = await Blog.create({
            videoUrl,
            title: title,
            content: blogContent,
            generatedAt: new Date()
        });

        res.status(201).json(blog);
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
            error: error.message,
            suggestion: "Try a shorter video or check the URL"
        });
    }
};