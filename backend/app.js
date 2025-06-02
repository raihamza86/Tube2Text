require('dotenv').config();
const cors = require('cors');
const express = require("express");
const blogRouter = require("./routes/blog");

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/blog", blogRouter);

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
