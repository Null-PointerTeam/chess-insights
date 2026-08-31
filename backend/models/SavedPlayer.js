/**
 * Mongoose SavedPlayer Model
 * Schema for tracked watchlist and scout list
 */

const mongoose = require('mongoose');

const savedPlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: { type: String, default: '' },
  platform: { type: String, default: 'chess.com' },
  country: { type: String, default: 'IN' },
  primaryRating: { type: String, default: '1987' },
  savedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.models.SavedPlayer || mongoose.model('SavedPlayer', savedPlayerSchema);
