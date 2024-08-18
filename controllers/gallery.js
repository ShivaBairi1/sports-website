const Gallery = require('../models/gallery');
const Sport = require('../models/sport'); // Import Sport model

const createGalleryItem = async (req, res) => {
    const { title, description, sportName } = req.body; // Updated to include sportName
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        // Find the sport by name
        const sport = await Sport.findOne({ where: { name: sportName } });
        const sportId = sport ? sport.sport_id : null;

        const galleryItem = await Gallery.create({
            title,
            description,
            image_url: imageUrl,
            sport_id: sportId // Link gallery item to the sport ID
        });

        res.status(201).json(galleryItem);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create gallery item.' });
    }
};

const getGalleryItems = async (req, res) => {
    try {
        const galleryItems = await Gallery.findAll({
            include: [{ model: Sport, attributes: ['name'] }]
        });
        res.send(galleryItems);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// New method to fetch gallery items by sport
const getGalleryItemsBySport = async (req, res) => {
    const { sport_id } = req.params;

    try {
        const galleryItems = await Gallery.findAll({
            where: { sport_id },
            include: [{ model: Sport, attributes: ['name'] }]
        });

        if (galleryItems.length === 0) {
            return res.status(404).json({ message: 'No gallery items found for this sport.' });
        }

        res.json(galleryItems);
    } catch (error) {
        console.error('Error fetching gallery items by sport:', error);
        res.status(500).json({ error: 'Failed to fetch gallery items' });
    }
};

const updateGalleryItem = async (req, res) => {
    const { id } = req.params;
    const { title, description, sportName } = req.body; // Updated to include sportName
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const galleryItem = await Gallery.findByPk(id);
        if (!galleryItem) {
            return res.status(404).send({ error: 'Gallery item not found' });
        }

        // Find the sport by name
        const sport = await Sport.findOne({ where: { name: sportName } });
        const sportId = sport ? sport.sport_id : null;

        galleryItem.title = title;
        galleryItem.description = description;
        if (imageUrl) {
            galleryItem.image_url = imageUrl;
        }
        galleryItem.sport_id = sportId;

        await galleryItem.save();
        res.send(galleryItem);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};

const deleteGalleryItem = async (req, res) => {
    const { id } = req.params;
    try {
        const galleryItem = await Gallery.findByPk(id);
        if (!galleryItem) {
            return res.status(404).send({ error: 'Gallery item not found' });
        }
        await galleryItem.destroy();
        res.send({ message: 'Gallery item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

module.exports = { createGalleryItem, getGalleryItems, getGalleryItemsBySport, updateGalleryItem, deleteGalleryItem };
