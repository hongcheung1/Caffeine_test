const mongoose = require('mongoose');

const DrinkSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  caffeine: {
    type: Number,
    required: true
  },
  serving: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('drink', DrinkSchema);
