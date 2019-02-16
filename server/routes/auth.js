const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.ctrl');

router.post('/user/authenticate', userController.authenticate);
router.post('/user/create', userController.createUser);

module.exports = router;
