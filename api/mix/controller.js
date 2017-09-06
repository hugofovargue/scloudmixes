const Mix = require('./model.js');
const Track = require('../track/model.js');

exports.find = (req, res) => {
  Mix.find({}, (err, mixes) => {
    if (err) res.json({ Success: false, Response: err });
    res.json({ Success: true, Response: mixes });
  });
};

exports.findById = (req, res) => {
  Mix.findOne({ _id: req.params.id }, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    res.json({ Success: true, Response: mix });
  });
};
// TODO: Add population to single retrieval

exports.create = (req, res) => {
  Mix.create(req.body, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    res.json({ Success: true, Response: mix });
  });
};

exports.delete = (req, res) => {
  Mix.findOne({ _id: req.params.id }, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    Mix.remove(mix, (err, rm) => {
      if (err) res.json({ Success: false, Response: err });
      res.json({ Success: true, Response: rm });
    });
  });
};

// Pushes _id reference into mix.tracks array; to be used with populate retrieval.
// Future optimisation with async or refactoring with FindOneAndUpdate,
// to prevent callback pyramid.
exports.addTrack = (req, res) => {
  Mix.findOne({ _id: req.params.id }, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    Track.findById({ _id: req.body.id }, (err, track) => {
      if (err) res.json({ Success: false, Response: err });
      mix.update({
        $addToSet: {
          tracks: {
            track: req.body.id,
            start: req.body.start,
            end: req.body.end,
          },
        },
      }, (err, raw) => {
        if (err) res.json({ Success: false, Response: err });
        console.log(raw);
        track.update({
          $addToSet: {
            mixes: req.params.id,
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
