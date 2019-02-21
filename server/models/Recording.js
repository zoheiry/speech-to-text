const mongoose = require('mongoose');

let RecordingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileUri: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  transcribedText: String,
});

module.exports = mongoose.model('Recording', RecordingSchema);
