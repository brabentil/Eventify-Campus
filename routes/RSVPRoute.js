const express = require('express');
const { createRSVP, getAllRSVPs, getRSVPById, updateRSVP, deleteRSVP } = require('../controllers/RSVPController.js');

const router = express.Router();

// Create a new RSVP
router.post('/', createRSVP);

// Get all RSVPs
router.get('/', getAllRSVPs);

// Get a single RSVP by ID
router.get('/:id', getRSVPById);

// Update an RSVP
router.put('/:id', updateRSVP);

// Delete an RSVP
router.delete('/:id', deleteRSVP);

module.exports = router;