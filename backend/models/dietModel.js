const mongoose = require('mongoose');

const dietModel = new mongoose.Schema({
  assignedDateTime: {
    type: Date,
    required: true
  },
  actualDateTime: {
    type: Date
  },
  timeDifference: {
    type: Number
  },
  isChecked: {
    type: String,
    default: "no",
    enum: ["no", "yes"]
  },
  title: {
    type: String,
    required: true,
    enum: ["breakfast", "morning snack", "lunch", "evening snack", "dinner"]
  },
  items: {
    type: Array,
    required: true
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

module.exports = mongoose.model("Diet", dietModel);
