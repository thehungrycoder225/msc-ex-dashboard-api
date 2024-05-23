const mongoose = require('mongoose');
const scholarshipProfileSchema = require('../schema/scholarship');
const Joi = require('joi');


const Scholarship = mongoose.model('Scholarship', scholarshipProfileSchema);

Scholarship.validate = (scholarship) => {
    const schema = Joi.object({
        year: Joi.number().required(),
        scholarshipName: Joi.string().required(),
        scholarshipCount: Joi.number().required()
    });

    return schema.validate(scholarship);
}

module.exports = Scholarship;