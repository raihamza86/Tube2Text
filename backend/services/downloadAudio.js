const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = function downloadAudio(youtubeUrl) {
    return new Promise((resolve, reject) => {
        if (!youtubeUrl || typeof youtubeUrl !== "string") {
            return reject(new Error("Invalid YouTube URL"));
        }

        const tempDir = path.join(__dirname, "../temp");

        // Ensure temp directory exists
        if (!fs.existsSync(tempDir)) {
            try {
                fs.mkdirSync(tempDir, { recursive: true });
            } catch (mkdirErr) {
                return reject(new Error("Failed to create temp directory: " + mkdirErr.message));
            }
        }

        const outputPath = path.join(tempDir, `${uuidv4()}.mp3`);
        const ytDlpPath = path.join("C:", "yt-dlp", "yt-dlp.exe");

        // Check if yt-dlp exists
        if (!fs.existsSync(ytDlpPath)) {
            return reject(new Error(`yt-dlp.exe not found at ${ytDlpPath}`));
        }

        const command = `"${ytDlpPath}" -x --audio-format mp3 -o "${outputPath}" "${youtubeUrl}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("yt-dlp command failed:", stderr);
                return reject(new Error("yt-dlp command failed: " + stderr));
            }

            // Confirm file exists
            if (!fs.existsSync(outputPath)) {
                return reject(new Error("Audio file was not created"));
            }

            resolve(outputPath);
        });
    });
};
