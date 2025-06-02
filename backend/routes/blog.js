const express = require("express");

const { createBlog, getVideoDetail } = require("../controllers/blogController");

const router = express.Router();


router.post("/", createBlog);

router.post("/details", getVideoDetail);


module.exports = router;