const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id',  userController.getProfile);
router.put('/:id',  userController.updateProfile);
router.delete('/:id', userController.deleteAccount);
router.get('/', userController.getAllUsers);

module.exports = router;