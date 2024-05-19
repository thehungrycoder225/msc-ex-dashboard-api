const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offeringSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['undergraduate', 'graduate', 'others'],
  },
  count: {
    type: Number,
    required: true,
  },
  change_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = offeringSchema;
