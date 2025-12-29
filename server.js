const app = require('./app');
const pool = require('./config/db');
const PORT = process.env.PORT || 5000;

// Test database connection
pool.query('SELECT 1')
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Database connection failed:', err));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});