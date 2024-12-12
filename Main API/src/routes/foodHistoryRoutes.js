const express = require('express');
const { getFoodHistory, getFoodHistoryDetail } = require('../controllers/foodHistoryController');
const router = express.Router();

// Route to get food history based on user UID
router.get('/:uid', getFoodHistory);

// Route to get food history details based on UID and history index
router.get('/:uid/:historyIndex', getFoodHistoryDetail);

module.exports = router;
