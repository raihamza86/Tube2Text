const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { default: YtdlpWrap } = require("yt-dlp-wrap");


const ytdlpWrap = new YtdlpWrap();
const tempDir = path.join(__dirname, "../temp");

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

async function downloadAudio(youtubeUrl) {
    if (!youtubeUrl || typeof youtubeUrl !== "string") {
        throw new Error("Invalid YouTube URL");
    }

    const outputPath = path.join(tempDir, `${uuidv4()}.mp3`);

    try {
        await ytdlpWrap.execPromise([
            youtubeUrl,
            "-x",
            "--audio-format", "mp3",
            "-o", outputPath
        ]);
    } catch (err) {
        console.error("yt-dlp-wrap failed:", err);
        throw new Error("Audio download failed");
    }

    if (!fs.existsSync(outputPath)) {
        throw new Error("Audio file was not created");
    }

    return outputPath;
}

module.exports = downloadAudio;
