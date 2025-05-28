// routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const { createBlog } = require("../controllers/blogController");

router.post("/generate", createBlog);

module.exports = router;
