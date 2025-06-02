const fs = require("fs");
const play = require("play-dl");

const downloadAudio = require("../services/downloadAudio");
const transcribeAudio = require("../services/transcribeAudio");
const { generateBlog, generateBlogTitle } = require("../services/generateBlog");
const cleanTranscript = require("../utils/cleanTranscript");

exports.createBlog = async (req, res, next) => {
    const { youtubeUrl } = req.body;

    if (!youtubeUrl) {
        return res.status(400).json({ error: "YouTube URL is required" });
    }

    let audioPath;

    try {
        audioPath = await downloadAudio(youtubeUrl);
        const transcript = await transcribeAudio(audioPath);
        const blogTitle = await generateBlogTitle(transcript);
        const blogContent = await generateBlog(transcript);
        const cleanedContent = cleanTranscript(blogContent);

        res.json({ success: true, title: blogTitle, content: cleanedContent });
    } catch (error) {
        console.error("Error during blog generation:", error);
        res.status(500).json({ success: false, error: "Failed to generate blog" });
    } finally {
        if (audioPath) {
            try {
                await fs.unlink(audioPath);
            } catch (cleanupErr) {
                console.warn("Failed to clean up audio file:", cleanupErr.message);
            }
        }
    }
};

exports.getVideoDetail = async (req, res) => {
    const { youtubeUrl } = req.body;

    if (!youtubeUrl) {
        return res.status(400).json({ error: "YouTube URL is required" });
    }

    try {
        const info = await play.video_info(youtubeUrl);
        const video = info.video_details;

        res.json({
            success: true,
            title: video.title,
            description: video.description,
            embedUrl: `https://www.youtube.com/embed/${video.id}`,
            thumbnail: video.thumbnails?.[video.thumbnails.length - 1]?.url || null,
            durationInSec: video.durationInSec,
            channel: video.channel.name
        });
    } catch (error) {
        console.error("Error fetching video details:", error.message);
        res.status(500).json({ success: false, error: "Failed to retrieve video details" });
    }
};