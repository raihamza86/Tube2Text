const Blog = require("../models/Blog");
const { getVideoTranscript } = require("../services/youtubeService");
const { generateBlogFromTranscript } = require("../services/aiService");

exports.createBlog = async (req, res) => {
    try {
        const { videoUrl } = req.body;

        const transcript = await getVideoTranscript(videoUrl);
        const blogContent = await generateBlogFromTranscript(transcript);

        const blog = await Blog.create({
            videoUrl,
            title: "Auto-generated Blog",
            content: blogContent,
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
