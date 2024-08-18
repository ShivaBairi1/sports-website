const Sport = require('../models/sport');
const Player = require('../models/player');
const Achievement = require('../models/achievement');
const Gallery = require('../models/gallery');
const News = require('../models/news');
const PhysicalDirector = require('../models/physicalDirector'); // Assuming this is your model for physical directors
const path = require('path');

// Controller to handle image upload
const uploadImage = async (req, res) => {
    try {
        const imageUrl = `http://localhost:3000/${req.file.path}`;
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// Get sport details by ID
const getSportDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const sport = await Sport.findByPk(id, {
            include: [
                { model: Player, as: 'Players' },
                { model: Achievement, as: 'Achievements' },
                { model: Gallery, as: 'Galleries' },
                { model: News, as: 'News' },
                { model: PhysicalDirector, as: 'PhysicalDirectors' } // Include physical directors
            ]
        });

        if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
        }

        res.json(sport);
    } catch (error) {
        console.error('Error fetching sport details:', error);
        res.status(500).json({ message: 'Error fetching sport details', error: error.message });
    }
};

// Create a new sport
const createSport = async (req, res) => {
    const { name, description, imageUrl } = req.body;
    try {
        const sport = await Sport.create({ name, description, image_url:imageUrl });
        res.status(201).json(sport);
    } catch (error) {
        console.error('Error creating sport:', error);
        res.status(400).json({ message: 'Error creating sport', error: error.message });
    }
};

// Get all sports
const getSports = async (req, res) => {
    try {
        const sports = await Sport.findAll();
        res.json(sports);
    } catch (error) {
        console.error('Error fetching sports:', error);
        res.status(500).json({ message: 'Error fetching sports', error: error.message });
    }
};

// Update a sport by ID
const updateSport = async (req, res) => {
    const { id } = req.params;
    const { name, description, image_url } = req.body;
    try {
        const sport = await Sport.findByPk(id);
        if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
        }
        if (name) sport.name = name;
        if (description) sport.description = description;
        if (image_url) sport.image_url = image_url;
        await sport.save();
        res.json(sport);
    } catch (error) {
        console.error('Error updating sport:', error);
        res.status(400).json({ message: 'Error updating sport', error: error.message });
    }
};

// Delete a sport by ID
const deleteSport = async (req, res) => {
    const { id } = req.params;
    try {
        const sport = await Sport.findByPk(id);
        if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
        }
        await sport.destroy();
        res.json({ message: 'Sport deleted successfully' });
    } catch (error) {
        console.error('Error deleting sport:', error);
        res.status(500).json({ message: 'Error deleting sport', error: error.message });
    }
};

module.exports = { createSport, getSports, updateSport, deleteSport, getSportDetails ,uploadImage};
