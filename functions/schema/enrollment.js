const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EnrollmentChangeSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  enrollmentCount: {
    type: Number,
    required: true,
  },
  change_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = EnrollmentChangeSchema;
