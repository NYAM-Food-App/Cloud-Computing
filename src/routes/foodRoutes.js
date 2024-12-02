const express = require('express');
const { chooseFood } = require('../controllers/foodController');

const router = express.Router();

// Endpoint untuk memilih makanan
router.post('/:uid', chooseFood);

module.exports = router;
