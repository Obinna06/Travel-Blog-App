const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'webcourse.cs.nuim.ie',  // Changed
  user: 'u240303',               // Changed
  password: 'yeenai4MiequiPho',   // Changed
  database: 'cs230_u240303',      // Changed
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;