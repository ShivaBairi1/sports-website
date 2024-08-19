const Player = require('../models/player');
const PlayerSports = require('../models/playerSports');
const Sport = require('../models/sport');
const path = require('path');
// Create a new player
const createPlayer = async (req, res) => {
    const { firstname, lastname, university_hall_ticket_number, mobile, email, sport_id } = req.body;

    if (!firstname || !lastname || !university_hall_ticket_number || !mobile || !email || !sport_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const player = await Player.create({
            firstname,
            lastname,
            university_hall_ticket_number,
            mobile,
            email,
            sport_id
        });

        res.status(201).json(player);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create player.' });
    }
};



// Get all players
const getPlayers = async (req, res) => {
    try {
        const players = await Player.findAll({
            include: [{ model: Sport, through: { attributes: [] }, attributes: ['name'] }]
        });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Get a single player by ID
const getPlayerById = async (req, res) => {
    const { id } = req.params;

    try {
        const player = await Player.findByPk(id, {
            include: [{ model: Sport, through: { attributes: [] }, attributes: ['name'] }]
        });

        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        res.json(player);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Update a player
const updatePlayer = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, university_hall_ticket_number, mobile, email, sportNames } = req.body;

    try {
        const player = await Player.findByPk(id);

        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        player.firstname = firstname;
        player.lastname = lastname;
        player.university_hall_ticket_number = university_hall_ticket_number;
        player.mobile = mobile;
        player.email = email;

        await player.save();

        if (sportNames && sportNames.length > 0) {
            const sports = await Sport.findAll({
                where: {
                    name: sportNames
                }
            });
            await player.setSports(sports);
        }

        res.json(player);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to update player.' });
    }
};

// Delete a player
const deletePlayer = async (req, res) => {
    const { id } = req.params;

    try {
        const player = await Player.findByPk(id);

        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        await player.destroy();
        res.json({ message: 'Player deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
// controllers/player.js
const Achievement = require('../models/achievement');

// Get achievements by player ID
const getPlayerAchievements = async (req, res) => {
    const { id } = req.params;

    try {
        const achievements = await Achievement.findAll({
            where: { player_id: id },
            order: [['date', 'DESC']]
        });

        if (!achievements || achievements.length === 0) {
            return res.status(404).json({ message: 'No achievements found for this player.' });
        }

        res.json(achievements);
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).send(error);
    }
};

module.exports = {
    createPlayer,
    getPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
    getPlayerAchievements // Export the new function
};

