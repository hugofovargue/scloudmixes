const Mix = require('./model.js');

exports.find = (req, res) => {
  Mix.find({}, (err, mixes) => {
    if (err) res.json({ Success: false, Response: err });
    res.json({ Success: true, Response: mixes });
  });
};

exports.findById = (req, res) => {
  Mix.find({ _id: req.params.id }, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    res.json({ Success: true, Response: mix });
  });
};
// Add population to single retrieval

exports.create = (req, res) => {
  Mix.create(req.body, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    res.json({ Success: true, Response: mix });
  });
};

exports.addTrack = (req, res) => {
  Mix.find({ _id: req.params.id }, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    mix.update({
      $push: {
        tracks: {
          _id: req.body.id,
          start: req.body.start,
          end: req.body.end,
        },
      },
    });
  });
};

exports.delete = (req, res) => {
  Mix.find({ _id: req.params.id }, (err, mix) => {
    if (err) res.json({ Success: false, Response: err });
    Mix.remove(mix, (err, rm) => {
      if (err) res.json({ Success: false, Response: err });
      res.json({ Success: true, Response: rm });
    });
  });
};
