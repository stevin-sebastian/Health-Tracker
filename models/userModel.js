const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  initialWeight: {
    type: Number,
    required: true
  },
  currentWeight: {
    type: Number
  },
  currentBMI: {
    type: Number
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Users", userModel);
