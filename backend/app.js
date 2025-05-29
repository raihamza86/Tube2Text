require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const express = require("express");
const blogRouter = require("./routes/blog");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/blog", blogRouter);

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
