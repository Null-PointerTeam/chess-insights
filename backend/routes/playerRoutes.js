/**
 * Express Player Routes
 * /api/player/...
 */

const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

// GET /api/player/saved
router.get('/saved', playerController.getSavedPlayers);

// GET /api/player/:platform/:username
router.get('/:platform/:username', playerController.getPlayer);

module.exports = router;
