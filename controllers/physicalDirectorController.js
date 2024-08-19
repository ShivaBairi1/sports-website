const PhysicalDirector = require('../models/physicalDirector');
const path = require('path');

// Controller to handle image upload
exports.uploadImage = async (req, res) => {
    try {
        const imageUrl = `http://localhost:3000/${req.file.path}`;
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllPhysicalDirectors = async (req, res) => {
    try {
        const directors = await PhysicalDirector.findAll();
        res.json(directors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching physical directors', error: error.message });
    }
};

exports.getPhysicalDirectorById = async (req, res) => {
    try {
        const director = await PhysicalDirector.findByPk(req.params.id);
        if (director) {
            res.json(director);
        } else {
            res.status(404).json({ message: 'Physical director not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching physical director', error: error.message });
    }
};

const SportPhysicalDirector = require('../models/sportPhysicalDirector');

exports.createPhysicalDirector = async (req, res) => {
    const { name, imageUrl, info, sports } = req.body;

    if (!name || !info) {
        return res.status(400).json({ message: 'Name and info are required' });
    }

    try {
        const newDirector = await PhysicalDirector.create({
            name,
            image:imageUrl,
            info
        });

        if (sports && sports.length > 0) {
            console.log('Associating sports:', sports);
            await Promise.all(sports.map(async (sportId) => {
                await SportPhysicalDirector.create({
                    sport_id: sportId,
                    physical_director_id: newDirector.id
                });
            }));
        }

        res.status(201).json(newDirector);
    } catch (error) {
        console.error('Error creating physical director:', error);
        res.status(500).json({ message: 'Error creating physical director', error: error.message });
    }
};
