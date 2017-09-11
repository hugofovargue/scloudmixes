const Mix = require('./model.js');
const Track = require('../track/model.js');

exports.find = (req, res) => {
  Mix.find({}, (err, mixes) => {
    if (err) res.json({ Success: false, Response: err });
    else res.json({ Success: true, Response: mixes });
  });
};

exports.findByUrl = (req, res) => {
  console.log(req.params);
  Mix
    .findOne({ url: `${req.params.url}${req.params[0]}` })
    .populate('tracks.track')
    .exec((err, mix) => {
      if (err) res.json({ Success: false, Response: err });
      else if (!mix) res.json({ Success: false, Response: 'no results found' });
      else res.json({ Success: true, Response: mix });
    });
};
// TODO: Prevent ID being passed back in api request

exports.create = (req, res) => {
  Mix.create(req.body, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    res.json({ Success: true, Response: mix });
  });
};

exports.delete = (req, res) => {
  console.log(req.params);
  Mix.findOne({ url: `${req.params.url}${req.params[0]}` }, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    Mix.remove(mix, (err, rm) => {
      if (err) res.json({ Success: false, Response: err });
      res.json({ Success: true, Response: rm });
    });
  });
};

// Pushes _id reference into mix.tracks array; to be used with populate retrieval.
// Future optimisation with async or refactoring with FindOneAndUpdate, to prevent
// callback pyramid.
exports.addTrack = (req, res) => {
  Mix.findOne({ url: `${req.params.url}${req.params[0]}` }, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    Track.findOne({ url: req.body.url }, (err, track) => {
      if (err) res.json({ Success: false, Response: err });
      console.log(track);
      mix.update({
        $addToSet: {
          tracks: {
            track: track.id,
            start: req.body.start,
            end: req.body.end,
          },
        },
      }, (err, raw) => {
        if (err) res.json({ Success: false, Response: err });
        console.log(raw);
        track.update({
          $addToSet: {
            mixes: mix.id,
          },
        }, (err, raw) => {
          if (err) res.json({ Success: false, Response: err });
          console.log(raw);
          res.json({ Success: true });
        });
      });
    });
  });
};
