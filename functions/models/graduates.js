const graduateSchema = require('../schema/graduates');
const mongoose = require('mongoose');
const Joi = require('joi');

const Graduate = mongoose.model('Graduate', graduateSchema);

Graduate.validate = function (graduate) {
  const schema = {
    year: Joi.number().required(),
    branch: Joi.string().required(),
    graduateCount: Joi.number().required(),
  };
  return Joi.validate(graduate, schema);
};

module.exports = Graduate;
