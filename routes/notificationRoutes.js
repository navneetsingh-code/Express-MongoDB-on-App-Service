const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/notify', verifyToken, notificationController.sendNotificationEmail);
router.post('/publishNotification', verifyToken, notificationController.publishNotification);
router.post

module.exports = router;
