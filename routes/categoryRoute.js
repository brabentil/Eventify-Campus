const express = require('express');
const categoryController = require('../controllers/categoryController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Get all categories
router.get('/', categoryController.getAllCategories,isAuthenticated);

// Get a single category by ID
router.get('/:id', categoryController.getCategoryById,isAuthenticated);

// Create a new category
router.post('/', categoryController.createCategory,isAuthenticated);

// Update an existing category
router.put('/:id', categoryController.updateCategory,isAuthenticated);

// Delete a category
router.delete('/:id', categoryController.deleteCategory,isAuthenticated);

module.exports = router;