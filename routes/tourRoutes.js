const express = require('express');
const tourController = require('./../controller/tourController');

// Routes for Tours
const router = express.Router();

router.param('id', tourController.checkID);

router
    .route('/')
    .get(tourController.checkID, tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour)

router
    .route('/:id')
    .patch(tourController.updateTour)
    .get(tourController.getTour)
    .delete(tourController.deleteTour)
    
module.exports = router;
