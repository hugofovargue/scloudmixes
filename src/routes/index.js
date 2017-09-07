const express = require('express');
const axios = require('axios');

const router = express.Router();

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
});


router.get('/', (req, res) => {
  res.render('index', { title: 'Add to scloud' });
});

router.get('/upload', (req, res) => {
  res.render('upload', { title: 'Upload Mix', subheading: 'This page is for manually uploading mixes. It will be removed once the extension is implemented.' });
});

// Mix specific routing
router.get('/mix/:mix', (req, res) => {
  instance.get(`/mixes/${req.params.mix}`)
    .then((response) => {
      const mix = response.data.Response;
      res.render('mix', {
        title: mix.title,
        user: mix.user,
        duration: mix.duration,
        tracks: mix.tracks,
      });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

router.get('/mix/:mix/*', (req, res) => {
  res.redirect(`../${req.params.mix}`);
});

// Track specific routing
router.get('/track/:track', (req, res) => {
  instance.get(`/tracks/${req.params.track}`)
    .then((response) => {
      const track = response.data.Response;
      res.render('track', {
        title: track.title,
        user: track.user,
        mixes: track.mixes,
      });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

router.get('/track/:track/*', (req, res) => {
  res.redirect(`../${req.params.track}`);
});

module.exports = router;
