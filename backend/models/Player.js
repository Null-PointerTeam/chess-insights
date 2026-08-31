/**
 * Mongoose Player Model
 * Schema for cached player profiles, ratings, games, and repertoire analytics
 */

const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  name: { type: String, default: '' },
  platform: { type: String, default: 'chess.com' },
  avatar: { type: String, default: '' },
  country: { type: String, default: '' },
  countryName: { type: String, default: '' },
  joined: { type: String, default: '' },
  lastOnline: { type: String, default: '' },
  status: { type: String, default: 'basic' },
  primaryRating: {
    format: { type: String, default: 'RAPID' },
    rating: { type: mongoose.Schema.Types.Mixed, default: 1200 },
    best: { type: mongoose.Schema.Types.Mixed, default: 1200 }
  },
  ratings: {
    bullet: { type: mongoose.Schema.Types.Mixed, default: '-' },
    blitz: { type: mongoose.Schema.Types.Mixed, default: '-' },
    rapid: { type: mongoose.Schema.Types.Mixed, default: '-' },
    puzzle: { type: mongoose.Schema.Types.Mixed, default: '-' }
  },
  overallRecord: {
    win: { type: Number, default: 0 },
    loss: { type: Number, default: 0 },
    draw: { type: Number, default: 0 }
  },
  recentMonth: {
    monthYear: { type: String, default: '' },
    totalGames: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    winPct: { type: String, default: '0.0%' },
    draws: { type: Number, default: 0 },
    drawPct: { type: String, default: '0.0%' },
    losses: { type: Number, default: 0 },
    lossPct: { type: String, default: '0.0%' }
  },
  repertoire: [
    {
      opening: String,
      firstMove: String,
      games: Number,
      winPct: String,
      isWinPositive: Boolean,
      performance: String
    }
  ],
  repertoireTree: { type: mongoose.Schema.Types.Mixed },
  reviewableGames: [{ type: mongoose.Schema.Types.Mixed }],
  isFallback: { type: Boolean, default: false },
  fetchedAt: { type: Date, default: Date.now, expires: 300 } // 5-minute TTL index in MongoDB
}, {
  timestamps: true
});

module.exports = mongoose.models.Player || mongoose.model('Player', playerSchema);
