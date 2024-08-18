// routes/admin.js

const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { performAdminAction } = require('../controllers/admin');
const { createGalleryItem } = require('../controllers/gallery');
const { createPlayer, getPlayers } = require('../controllers/player');
// const adminAuth = require('../middleware/adminAuth');
// const authMiddleware = require('../middleware/auth');
// Route to create a player

router.post('/players', adminAuth, createPlayer);

// Route to get all players
// router.get('/players', adminAuth, getPlayers);
// POST /api/admin/gallery - Create a new gallery item with admin access
router.post('/gallery', adminAuth, createGalleryItem);
// POST /api/admin/perform-action - Example route for admin actions
router.post('/perform-action', adminAuth, performAdminAction);

module.exports = router;
