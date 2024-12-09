const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  message: { type: String, required: true }, // Notification content
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Reference to the related event
  read: { type: Boolean, default: false }, // Whether the notification has been read
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
