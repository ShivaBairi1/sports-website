const express = require('express');
const { createPlayer, getPlayers, getPlayerById, updatePlayer, deletePlayer } = require('../controllers/player');
const upload = require('../config/multer-config')
const router = express.Router();
// routes/player.js
const { getPlayerAchievements } = require('../controllers/player');

router.get('/:id/achievements', getPlayerAchievements);

// Create a new player
router.post('/', upload.single('profile_picture'), createPlayer);

// Get all players
router.get('/', getPlayers);

// Get a single player by ID
router.get('/:id', getPlayerById);

// Update a player
router.put('/:id', updatePlayer);

// Delete a player
router.delete('/:id', deletePlayer);

module.exports = router;
