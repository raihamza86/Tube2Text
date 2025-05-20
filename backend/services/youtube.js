const axios = require('axios');

module.exports = async (url) => {
    // Extract video ID (e.g., from "https://youtu.be/abc123" or "https://youtube.com/watch?v=abc123")
    const videoId = url.match(/(?:youtu\.be\/|watch\?v=)([^&]+)/)[1];

    // Fetch transcript via YouTube's API (or third-party like RapidAPI)
    const response = await axios.get(`https://youtube-transcriptor.vercel.app/api/transcript?id=${videoId}`);

    if (!response.data.transcript) {
        throw new Error('Transcript not available for this video');
    }

    return response.data.transcript;
};