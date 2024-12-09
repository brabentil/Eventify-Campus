const express = require('express');
const notificationController = require('../controllers/notificationController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Get all notifications for a user
router.get('/:userId', notificationController.getNotifications,isAuthenticated);

// Create a new notification
router.post('/', notificationController.createNotification,isAuthenticated);

// Mark a notification as read
router.patch('/:id/read', notificationController.markAsRead,isAuthenticated);

// Delete a notification
router.delete('/:id', notificationController.deleteNotification,isAuthenticated);

module.exports = router;