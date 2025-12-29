const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const travelLogRoutes = require('./routes/travelLogRoutes');
const journeyPlanRoutes = require('./routes/journeyPlanRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/travel-logs', travelLogRoutes);
app.use('/api/journey-plans', journeyPlanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error!' });
});

module.exports = app;
