const express = require('express');
const eventController = require('../controllers/eventController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Get all events
router.get('/', eventController.getAllEvents,isAuthenticated);

// Get a single event by ID
router.get('/:id', eventController.getEventById,isAuthenticated);

// Create a new event
router.post('/', eventController.createEvent,isAuthenticated);

// Update an existing event
router.put('/:id', eventController.updateEvent,isAuthenticated);

// Delete an event
router.delete('/:id', eventController.deleteEvent,isAuthenticated);

module.exports = router;