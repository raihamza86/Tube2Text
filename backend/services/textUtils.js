function splitText(text, maxLength = 2000) {
    const result = [];
    let current = '';

    const sentences = text.split(/(?<=[.!?])\s+/);

    for (const sentence of sentences) {
        if (current.length + sentence.length > maxLength) {
            result.push(current);
            current = '';
        }
        current += sentence + ' ';
    }

    if (current) result.push(current);
    return result;
}

module.exports = { splitText };