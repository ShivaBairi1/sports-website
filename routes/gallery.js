// routes/gallery.js
const express = require('express');
const router = express.Router();
const upload = require('../upload');
const { createGalleryItem, getGalleryItems, updateGalleryItem, deleteGalleryItem, getGalleryItemsBySport } = require('../controllers/gallery');
const { auth, isAdmin } = require('../middleware/auth');

// Upload gallery item
router.post('/', auth, isAdmin, upload.single('image'), createGalleryItem);

// Get gallery items
router.get('/', getGalleryItems);

// Get gallery items by sport
router.get('/by-sport/:sport_id', getGalleryItemsBySport);

// Update gallery item
router.put('/:id', auth, isAdmin, upload.single('image'), updateGalleryItem);

// Delete gallery item
router.delete('/:id', auth, isAdmin, deleteGalleryItem);

module.exports = router;
