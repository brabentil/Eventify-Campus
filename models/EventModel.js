const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String }, // Optional time
  location: { type: String }, // Physical or virtual location
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to the category
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the creator
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users attending the event
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);