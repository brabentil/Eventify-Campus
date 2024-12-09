const Event = require('../models/EventModel');
const mongoose = require('mongoose');

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('category').populate('created_by').populate('attendees');
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('category').populate('created_by').populate('attendees');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        category: req.body.category,
        created_by: req.body.created_by,
        status: req.body.status,
        attendees: req.body.attendees
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an existing event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (req.body.name != null) {
            event.name = req.body.name;
        }
        if (req.body.description != null) {
            event.description = req.body.description;
        }
        if (req.body.date != null) {
            event.date = req.body.date;
        }
        if (req.body.time != null) {
            event.time = req.body.time;
        }
        if (req.body.location != null) {
            event.location = req.body.location;
        }
        if (req.body.category != null) {
            event.category = req.body.category;
        }
        if (req.body.status != null) {
            event.status = req.body.status;
        }
        if (req.body.attendees != null) {
            event.attendees = req.body.attendees;
        }

        event.updated_at = Date.now();

        const updatedEvent = await event.save();
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event.remove();
        res.status(200).json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};