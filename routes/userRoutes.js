const express = require('express');
const userController = require('./../controller/userController');

// Routes for Users
const router = express.Router();
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .patch(userController.updateUser)
    .get(userController.getUser)
    .delete(userController.deleteUser)

module.exports = router;
