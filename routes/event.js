// routes/event.js
const express = require('express');
const { createEvent, getEvents, getUpcomingEvents, getOngoingEvents, getPastEvents, getEventsBySport } = require('../controllers/event');
const { auth, isAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, isAdmin, upload.single('banner_image'), createEvent);
router.get('/', getEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/ongoing', getOngoingEvents);
router.get('/past', getPastEvents);

// Route for fetching events by sport
router.get('/by-sport/:sport_id', getEventsBySport);

module.exports = router;
