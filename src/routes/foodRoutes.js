const express = require('express');
const { chooseFood } = require('../controllers/foodController');

const router = express.Router();

// Endpoint to choose food based on user UID
router.post('/:uid', chooseFood);

module.exports = router;
