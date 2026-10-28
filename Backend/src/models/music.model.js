const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
    artist: {
    type: String,
    required: true,
    trim: true
  },
  musicUrl: {
    type: String,
    required: true
},
},
  { timestamps: true }
);

const musicModel = mongoose.model('Music', musicSchema);

module.exports = musicModel;