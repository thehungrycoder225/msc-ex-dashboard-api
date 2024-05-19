const mongoose = require('mongoose');
const offeringSchema = require('../schema/offerings');
const Joi = require('joi');
const Offering = mongoose.model('Offering', offeringSchema);

Offering.validate = function (offering) {
  const schema = {
    year: Joi.number().required(),
    branch: Joi.string().required(),
    semester: Joi.number().required(),
    enrollment_count: Joi.number().required(),
  };

  return Joi.validate(offering, schema);
};

module.exports = Offering;
