module.exports = (content, options) => {
    // Simple keyword insertion (replace with proper NLP if needed)
    if (options.keywords?.length) {
        options.keywords.forEach(keyword => {
            content = content.replace(
                new RegExp(`\\b${keyword}\\b`, 'gi'),
                `<strong>${keyword}</strong>`
            );
        });
    }
    return content;
};