const RSVP = require('../models/RSVPModel.js');
const Event = require('../models/EventModel.js');
const User = require('../models/userModel.js');

// Create a new RSVP
const createRSVP = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        // Check if the user and event exist
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        if (!user || !event) {
            return res.status(404).json({ message: 'User or Event not found' });
        }

        const newRSVP = new RSVP({
            user: userId,
            event: eventId,
        });

        const savedRSVP = await newRSVP.save();
        res.status(201).json(savedRSVP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all RSVPs
const getAllRSVPs = async (req, res) => {
    try {
        const rsvps = await RSVP.find().populate('user').populate('event');
        res.status(200).json(rsvps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single RSVP by ID
const getRSVPById = async (req, res) => {
    try {
        const rsvp = await RSVP.findById(req.params.id).populate('user').populate('event');
        if (!rsvp) {
            return res.status(404).json({ message: 'RSVP not found' });
        }
        res.status(200).json(rsvp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an RSVP
const updateRSVP = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        // Check if the user and event exist
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        if (!user || !event) {
            return res.status(404).json({ message: 'User or Event not found' });
        }

        const updatedRSVP = await RSVP.findByIdAndUpdate(
            req.params.id,
            { user: userId, event: eventId },
            { new: true }
        );

        if (!updatedRSVP) {
            return res.status(404).json({ message: 'RSVP not found' });
        }

        res.status(200).json(updatedRSVP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an RSVP
const deleteRSVP = async (req, res) => {
    try {
        const deletedRSVP = await RSVP.findByIdAndDelete(req.params.id);
        if (!deletedRSVP) {
            return res.status(404).json({ message: 'RSVP not found' });
        }
        res.status(200).json({ message: 'RSVP deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRSVP,
    getAllRSVPs,
    getRSVPById,
    updateRSVP,
    deleteRSVP
};