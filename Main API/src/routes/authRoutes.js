const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Endpoint for user registration
router.post('/register', authController.register);

module.exports = router;
