const Event = require('../models/event');
const { Op } = require('sequelize');

// Create an event
const createEvent = async (req, res) => {
    const { title, date, description, location, sport_id } = req.body;
    const adminId = req.user.user_id;
    const bannerImageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        const event = await Event.create({
            title,
            date,
            description,
            location,
            banner_image_url: bannerImageUrl,
            admin_id: adminId,
            sport_id
        });
        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create event.' });
    }
};

// Fetch all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.send(events);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get upcoming events
const getUpcomingEvents = async (req, res) => {
    try {
        const now = new Date();
        const upcomingEvents = await Event.findAll({
            where: {
                date: {
                    [Op.gt]: now
                }
            },
            order: [['date', 'ASC']]
        });
        res.send(upcomingEvents);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getOngoingEvents = async (req, res) => {
    try {
        const now = new Date();
        const ongoingEvents = await Event.findAll({
            where: {
                date: {
                    [Op.between]: [new Date(0), now]
                }
            },
            order: [['date', 'ASC']]
        });
        res.send(ongoingEvents);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getPastEvents = async (req, res) => {
    try {
        const now = new Date();
        const pastEvents = await Event.findAll({
            where: {
                date: {
                    [Op.lt]: now
                }
            },
            order: [['date', 'DESC']]
        });
        res.send(pastEvents);
    } catch (error) {
        res.status(500).send(error);
    }
};


// Existing methods...

// Fetch events by sport
const getEventsBySport = async (req, res) => {
    const { sport_id } = req.params;

    try {
        const events = await Event.findAll({
            where: { sport_id },
            order: [['date', 'ASC']] // Order by date, ascending
        });

        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found for this sport.' });
        }

        res.json(events);
    } catch (error) {
        console.error('Error fetching events by sport:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

module.exports = { createEvent, getEvents, getUpcomingEvents, getOngoingEvents, getPastEvents, getEventsBySport };


