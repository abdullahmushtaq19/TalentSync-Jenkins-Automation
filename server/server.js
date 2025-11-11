const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companyRoutes');
const salarayRoutes = require('./routes/salaryRoutes');
const userRoutes = require('./routes/userRoute');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request body

// Disable ETag for API responses and prevent caching to avoid 304 Not Modified for JSON API
app.disable('etag');
app.use('/api', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

// Backend routes
app.use(jobRoutes);
app.use(companyRoutes);
app.use(salarayRoutes);
app.use(userRoutes);

// Note: Frontend is now served by a dedicated nginx container (see docker-compose.yml)
// Backend only serves API endpoints, no static file serving needed

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL;
// Basic validation for Mongo connection string
if (!mongoUrl || (!mongoUrl.startsWith('mongodb://') && !mongoUrl.startsWith('mongodb+srv://'))) {
    console.error('FATAL: MONGO_URL is not set or is invalid. It must start with "mongodb://" or "mongodb+srv://"');
    console.error('Current MONGO_URL:', mongoUrl);
    // Exit with non-zero so container orchestration knows startup failed
    process.exit(1);
}

mongoose.connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

// Use EB-assigned port or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
