const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    videoUrl: String,
    title: String,
    content: String,
    keywords: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
