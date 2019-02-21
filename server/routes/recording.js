const express = require('express');
const router = express.Router();
const recordingController = require('../controllers/recording.ctrl');

router.post('/recording/upload', recordingController.upload);

module.exports = router;
