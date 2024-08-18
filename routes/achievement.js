const express = require('express');
const router = express.Router();
const { Achievement, Player } = require('../models');
const { auth } = require('../middleware/auth'); // Assuming you have an authentication middleware

// Route to add an achievement for a player
router.post('/achievements', auth, async (req, res) => {
    const { user_id } = req.user; // Assuming req.user is set by authenticate middleware
    const { title, description, image_url, sport_id } = req.body;

    try {
        // Find the player associated with the logged-in user
        const player = await Player.findOne({ where: { user_id } });

        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        const achievement = await Achievement.create({
            player_id: player.player_id,
            title,
            description,
            image_url,
            sport_id
        });

        res.status(201).json(achievement);
    } catch (error) {
        console.error('Error adding achievement:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get achievements for a player
router.get('/api/achievements/:playerId', async (req, res) => {
    const { playerId } = req.params;

    try {
        const achievements = await Achievement.findAll({ where: { player_id: playerId } });

        if (!achievements.length) {
            return res.status(404).json({ error: 'No achievements found for this player' });
        }

        res.status(200).json(achievements);
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
