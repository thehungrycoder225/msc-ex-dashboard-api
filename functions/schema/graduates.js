const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const graduateSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  graduateCount: {
    type: Number,
    required: true,
  },
  change_date: {
    type: Date,
  },
});

module.exports = graduateSchema;
