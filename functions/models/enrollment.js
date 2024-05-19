const mongoose = require('mongoose');
const joi = require('joi');
const EnrollmentSchema = require('../schema/enrollment');
const EnrollmentRate = mongoose.model('Enrollment', EnrollmentSchema);

EnrollmentRate.validate = function (enrollment) {
  const schema = {
    year: joi.number().required(),
    branch: joi.string().required(),
    semester: joi.number().required(),
    enrollmentCount: joi.number().required(),
    change_date: joi.date(),
  };

  return joi.validate(enrollment, schema);
};

module.exports = EnrollmentRate;
