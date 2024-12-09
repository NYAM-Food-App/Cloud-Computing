const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Endpoint to get user profile based on UID
router.get('/:uid', userController.getUserProfile);

// Endpoint to update user profile based on UID
router.put('/:uid', userController.updateUserProfile);

module.exports = router;
