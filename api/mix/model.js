const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mixSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  user: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  tracks: [{
    type: Schema.Types.ObjectId,
    ref: 'Track',
    start: Number,
    end: Number,
  }],
}, {
  collection: 'mixes',
});

module.exports = mongoose.model('Mix', mixSchema);
