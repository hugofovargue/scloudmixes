const express = require('express');

const router = express.Router();

const mixController = require('./mix/controller.js');
const trackController = require('./track/controller.js');

router.get('/', (req, res) => res.json({ Success: 'API entry point' }));

// Mix routes
router.get('/mixes', mixController.find);
router.get('/mixes/:url*', mixController.findByUrl);
router.post('/mixes', mixController.create);
router.delete('/mixes/:url*', mixController.delete);
router.put('/mixes/:url*', mixController.addTrack);

// Track routes
router.get('/tracks', trackController.find);
router.get('/tracks/:url*', trackController.findByUrl);
router.post('/tracks', trackController.create);
router.delete('/tracks/:url*', trackController.delete);

module.exports = router;
