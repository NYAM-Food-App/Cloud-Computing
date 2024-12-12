const express = require('express');
const multer = require('multer');
const { analyzeFood } = require('../controllers/analyzeController');

const router = express.Router();

// Set up multer for storing images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for analyzing food image
router.post('/:uid', upload.single('file'), analyzeFood);

// Endpoint for direct text-based food analysis
router.post('/text/:uid', analyzeFood);

module.exports = router;