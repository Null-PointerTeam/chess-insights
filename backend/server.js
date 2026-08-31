/**
 * Chess Insights - MERN Stack Backend Server
 * Express.js REST API + MongoDB Mongoose Model Integration + Static React App Serving
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, getDBStatus } = require('./config/db');
const playerRoutes = require('./routes/playerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[HTTP ${req.method}] ${req.url}`);
  next();
});

// API Routes
app.use('/api/player', playerRoutes);

// Health & System Status Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: getDBStatus(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve Frontend Static Build / Files
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Catch-all route to serve React index.html for Single Page Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` ♟️  Chess Insights (MERN Stack) running on port ${PORT}`);
  console.log(` 📦 Database: ${getDBStatus().mode}`);
  console.log(` 🚀 Express API: http://localhost:${PORT}/api/player/:platform/:username`);
  console.log(`=======================================================`);
});

module.exports = app;
