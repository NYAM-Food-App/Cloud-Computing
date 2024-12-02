const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:uid', userController.getUserProfile);
router.put('/:uid', userController.updateUserProfile);

module.exports = router;
