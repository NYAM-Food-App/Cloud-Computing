const express = require('express');
const { getFoodHistory, getFoodHistoryDetail } = require('../controllers/foodHistoryController');
const router = express.Router();

// Route untuk menampilkan foodHistory berdasarkan UID pengguna
router.get('/:uid', getFoodHistory);

// Route untuk menampilkan detail foodHistory berdasarkan UID dan index
router.get('/:uid/:historyIndex', getFoodHistoryDetail);

module.exports = router;
