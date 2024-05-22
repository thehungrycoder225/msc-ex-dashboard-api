const mongoose = require('mongoose');
const accreditationSchema = require('../schema/accreditation');
const Joi = require('joi');
const Accreditation = mongoose.model('Accreditation', accreditationSchema);

Accreditation.validate = function (accreditation) {
    const schema = Joi.object({
        year: Joi.number().required(),
        category: Joi.string().required(),
        program: Joi.string().required(),
        accreditationCount: Joi.number().required()
    });
    return schema.validate(accreditation);
}

module.exports = Accreditation;