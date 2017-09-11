const mongoose = require('mongoose');

const mixSchema = new mongoose.Schema({
  url: { type: String, required: true },
  user: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  duration: { type: String, required: true },
  tracks: [{
    _id: false,
    track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
    start: { type: String, required: true },
    end: { type: String, required: true },
  }],
}, {
  collection: 'mixes',
});

module.exports = mongoose.model('Mix', mixSchema);
