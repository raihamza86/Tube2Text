const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// DB Connection
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blog', blogRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));