const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema({
  url: String,
  user: String,
  title: String,
  mixes: [{
    type: Schema.Types.ObjectId,
    ref: 'Mix',
  }],
}, {
  collection: 'tracks',
});

module.exports = mongoose.model('Track', trackSchema);
