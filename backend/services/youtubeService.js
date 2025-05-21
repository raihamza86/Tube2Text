const { getTranscript } = require('youtube-transcript-api');
const axios = require('axios');

// Improved video ID extraction
function extractVideoId(url) {
    const patterns = [
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
        /^([^"&?\/\s]{11})$/ // Just the video ID
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

// Alternative method to get captions
async function getVideoCaptions(videoId) {
    try {
        const response = await axios.get(
            `https://www.youtube.com/watch?v=${videoId}`, 
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            }
        );
        
        const html = response.data;
        const captionTracks = html.match(/"captionTracks":(\[.*?\])/);
        if (captionTracks) {
            const tracks = JSON.parse(captionTracks[1]);
            return tracks.find(track => track.languageCode === 'en');
        }
        return null;
    } catch (err) {
        console.error("Caption check failed:", err.message);
        return null;
    }
}

const getVideoTranscript = async (url) => {
    try {
        const videoId = extractVideoId(url);
        if (!videoId) throw new Error('Invalid YouTube URL');

        // Try official transcript API first
        try {
            const transcriptArray = await getTranscript(videoId);
            return transcriptArray.map(obj => obj.text).join(' ');
        } catch (officialError) {
            console.log("Official transcript failed, trying alternatives...");
            
            // Check if captions exist
            const captions = await getVideoCaptions(videoId);
            if (!captions) {
                throw new Error('Captions disabled for this video');
            }
            
            // If captions exist but API failed, suggest manual upload
            throw new Error('Auto-captions available but not accessible. Try a different video or enable captions.');
        }
    } catch (error) {
        console.error("Transcript Error:", error.message);
        throw new Error('Transcript not available. Try videos with English captions enabled.');
    }
};

module.exports = { 
    getVideoTranscript,
    extractVideoId 
};