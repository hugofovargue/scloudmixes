const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  url: { type: String, required: true },
  user: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  mixes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mix' }],
}, {
  collection: 'tracks',
});

module.exports = mongoose.model('Track', trackSchema);
