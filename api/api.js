const express = require('express');
const router = express.Router();

const mixController = require('./mix/controller.js');
const trackController = require('./track/controller.js');

router.get('/', (req, res) => {
  res.json({
    success: 'API entry point',
  });
});

// Mix routes
router.get('/mixes', mixController.find);
router.get('/mixes/:id', mixController.findById);
router.post('/mixes', mixController.create);
router.delete('/mixes/:id', mixController.delete);
router.put('/mixes/:id', mixController.addTrack);

// Track routes
router.get('/tracks', trackController.find);
router.get('/tracks/:id', trackController.findById);
router.post('/tracks', trackController.create);
router.delete('/tracks/:id', trackController.delete);

module.exports = router;
