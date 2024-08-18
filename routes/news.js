const express = require('express');
const { auth, isAdmin } = require('../middleware/auth');
const upload = require('../upload');
const {
    createNewsItem,
    getNewsItemsBySport,
    getNewsItemById,
    updateNewsItem,
    deleteNewsItem,
    getAllNewsPosts
} = require('../controllers/news');

const router = express.Router();

router.post('/', auth, isAdmin, upload.single('banner_image_url'), createNewsItem);
router.get('/by-sport/:sport_id', getNewsItemsBySport);
router.get('/:id', getNewsItemById);
router.put('/:id', auth, isAdmin, updateNewsItem);
router.delete('/:id', auth, isAdmin, deleteNewsItem);
router.get('/', getAllNewsPosts);

module.exports = router;
