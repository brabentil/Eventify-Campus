const Notification = require('../models/notificationModel');

// Get all notifications for a user
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.userId }).populate('event');
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new notification
exports.createNotification = async (req, res) => {
    const { user, message, event } = req.body;

    const newNotification = new Notification({
        user,
        message,
        event
    });

    try {
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.read = true;
        const updatedNotification = await notification.save();
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        await notification.remove();
        res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};