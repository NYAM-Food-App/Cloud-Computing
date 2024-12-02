// src/routes/analyzeRoutes.js
const express = require('express');
const multer = require('multer');
const { analyzeFood } = require('../controllers/analyzeController');

const router = express.Router();

// Set up multer untuk penyimpanan gambar di memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint untuk menganalisis gambar makanan
router.post('/:uid', upload.single('file'), analyzeFood);

module.exports = router;
