const mongoose = require('mongoose');

const bmiModel = new mongoose.Schema({
  weight: {
    type: Number,
    required: true
  },
  bmi: {
    type: Number
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("BMI", bmiModel);
