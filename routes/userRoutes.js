const express = require('express');
const userController = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all users
router.get('/', userController.getAllUsers,isAuthenticated,isAdmin);

// Get user by ID
router.get('/:id', userController.getUserById,isAuthenticated,isAdmin);

// Create new user
router.post('/', userController.createUser,isAuthenticated,isAdmin);

// Update user
router.put('/:id', userController.updateUser,isAuthenticated,isAdmin);

// Delete user
router.delete('/:id', userController.deleteUser,isAuthenticated,isAdmin);

module.exports = router;