const Track = require('./model.js');

exports.find = (req, res) => {
  Track.find({}, (err, tracks) => {
    if (err) res.json({ Success: false, Response: err });
    res.json({ Success: true, Response: tracks });
  });
};

exports.findById = (req, res) => {
  Track.findOne({ _id: req.params.id }, (err, track) => {
    if (err) res.json({ Success: false, Response: err });
    res.json({ Success: true, Response: track });
  });
};

exports.create = (req, res) => {
  Track.create(req.body, (err, track) => {
    if (err) res.json({ Success: false, Response: err });
    res.json({ Success: true, Response: track });
  });
};

exports.delete = (req, res) => {
  Track.findOne({ _id: req.params.id }, (err, track) => {
    if (err) res.json({ Success: false, Response: err });
    Track.remove(track, (err, rm) => {
      if (err) res.json({ Success: false, Response: err });
      res.json({ Success: true, Response: rm });
    });
  });
};
