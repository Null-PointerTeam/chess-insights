/**
 * MongoDB Connection Configuration with Graceful Memory Fallback
 * Connects to MongoDB via Mongoose or falls back gracefully to in-memory caching
 */

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chess_insights';

let isConnected = false;

async function connectDB() {
  try {
    // Attempt connection with a short timeout so local offline DB doesn't hang the app
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 2000
    });
    isConnected = true;
    console.log(`[MONGODB] Connected successfully to ${MONGO_URI}`);
  } catch (err) {
    isConnected = false;
    console.warn(`[MONGODB] Notice: Running in high-performance in-memory cache mode (MongoDB offline: ${err.message})`);
  }
}

function getDBStatus() {
  return {
    connected: isConnected,
    mode: isConnected ? 'MongoDB (Mongoose)' : 'In-Memory / Hybrid Cache'
  };
}

module.exports = {
  connectDB,
  getDBStatus,
  isConnected: () => isConnected
};
