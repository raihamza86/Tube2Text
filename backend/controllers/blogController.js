const Blog = require("../models/Blog");
const { getVideoTranscript, extractVideoId } = require("../services/youtubeService");
const { generateBlogFromTranscript } = require("../services/aiService");
const { generateBlogTitle } = require("../services/titleService");

exports.createBlog = async (req, res) => {
    try {
        const { videoUrl } = req.body;

        if (!videoUrl) {
            return res.status(400).json({
                error: "YouTube URL is required",
                example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            });
        }

        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            return res.status(400).json({
                error: "Invalid YouTube URL",
                validFormats: [
                    "https://www.youtube.com/watch?v=VIDEO_ID",
                    "https://youtu.be/VIDEO_ID"
                ]
            });
        }

        let transcript;
        try {
            transcript = await getVideoTranscript(videoUrl);
        } catch (transcriptError) {
            return res.status(422).json({
                error: "Cannot process this video",
                reasons: [
                    "Captions may be disabled",
                    "Video may be unavailable in your region",
                    "Video may be private or deleted"
                ],
                solutions: [
                    "Try videos with visible English captions",
                    "Try popular educational channels",
                    "Check https://downsub.com/ for manual transcript download"
                ]
            });
        }

        const [blogContent, title] = await Promise.all([
            generateBlogFromTranscript(transcript),
            generateBlogTitle(transcript)
        ]);

        const blog = await Blog.create({
            videoUrl,
            videoId,
            title,
            content: blogContent,
            status: "generated"
        });

        res.status(201).json({
            success: true,
            data: blog,
            tips: "For better results, use videos with clear narration and enabled captions"
        });

    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({
            success: false,
            error: "Content generation failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
            support: "contact@yourdomain.com"
        });
    }
};