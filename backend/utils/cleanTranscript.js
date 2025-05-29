function cleanTranscript(text) {
    const patterns = [
        /remember to like.*?subscribe.*?channel.*?(\n|$)/gi,
        /don’t forget to (like|subscribe).*?(\n|$)/gi,
        /please (like|subscribe).*?(\n|$)/gi,
        /hit the (notification|bell).*?(\n|$)/gi,
        /follow me on (twitter|instagram|facebook|linkedin|youtube).*?(\n|$)/gi,
        /thank you for watching.*?(\n|$)/gi,
        /feel free to (like|share|subscribe|comment|follow).*?(\n|$)/gi,
        /don't forget to share.*?(\n|$)/gi,
        /happy (coding|learning|new year|holidays).*?(\n|$)/gi,
        /stay tuned.*?(\n|$)/gi,
        /see you in the next (one|tutorial|video|blog).*?(\n|$)/gi
    ];

    let cleaned = text;
    for (const pattern of patterns) {
        cleaned = cleaned.replace(pattern, '');
    }

    cleaned = cleaned.replace(/## Conclusion[\s\S]*$/i, '').trim();

    return cleaned.trim();
}



module.exports = cleanTranscript;