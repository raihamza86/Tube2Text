const { getTranscript } = require('youtube-transcript-api');

function extractVideoId(url) {
    const regex = /(?:youtube\.com\/.*(?:v=|\/embed\/|\/v\/)|youtu\.be\/)([0-9A-Za-z_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


const getVideoTranscript = async (url) => {
    try {
        const videoId = extractVideoId(url);
        if (!videoId) throw new Error('Invalid YouTube URL');

        const transcriptArray = await getTranscript(videoId);
        const fullTranscript = transcriptArray.map(obj => obj.text).join(' ');
        return fullTranscript;
    } catch (error) {
        console.error(error);
        throw new Error('Transcript not available for this video.');
    }
};


module.exports = { getVideoTranscript };
