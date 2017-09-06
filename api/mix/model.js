const mongoose = require('mongoose');

const mixSchema = new mongoose.Schema({
  url: { type: String, required: true },
  user: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  tracks: [{
    _id: false,
    track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
  }],
}, {
  collection: 'mixes',
});

module.exports = mongoose.model('Mix', mixSchema);
