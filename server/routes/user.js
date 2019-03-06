const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.ctrl');

router.get('/user/self', userController.getCurrentUser);
// currently just for internal use.
router.put('/user/self/change_password', userController.changePassword);

module.exports = router;
