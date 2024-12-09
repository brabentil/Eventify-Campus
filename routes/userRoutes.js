const express = require('express');
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Get all users
router.get('/', userController.getAllUsers,isAuthenticated);

// Get user by ID
router.get('/:id', userController.getUserById,isAuthenticated);

// Create new user
router.post('/', userController.createUser,isAuthenticated);

// Update user
router.put('/:id', userController.updateUser,isAuthenticated);

// Delete user
router.delete('/:id', userController.deleteUser,isAuthenticated);

module.exports = router;