const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getAllPhysicalDirectors,
    getPhysicalDirectorById,
    createPhysicalDirector,uploadImage,
} = require('../controllers/physicalDirectorController'); // Correct path
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
// Define routes


router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getAllPhysicalDirectors);
router.get('/:id', getPhysicalDirectorById);
router.post('/', createPhysicalDirector);

module.exports = router;
