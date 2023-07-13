const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.use(express.json());

router.get('/', userController.getAllUsers);
router.post('/add', userController.createUser); // Endpoint for creating a user
router.get('/:id', userController.getUser); // Endpoint for getting a user
router.put('/:id', userController.updateUser); // Endpoint for updating a user
router.delete('/:id', userController.deleteUser); // Endpoint for deleting a user

module.exports = router;
