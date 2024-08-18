const express = require('express');
const { createSport, getSports, updateSport, deleteSport, getSportDetails ,uploadImage} = require('../controllers/sport');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), uploadImage);
router.post('/', auth, isAdmin, createSport);
router.get('/', getSports);
router.put('/:id', auth, isAdmin, updateSport);
router.delete('/:id', auth, isAdmin, deleteSport);
router.get("/:id",getSportDetails);
module.exports = router;
