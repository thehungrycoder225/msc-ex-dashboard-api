const mongoose = require('mongoose')
const licensureProfileSchema = require('../schema/licensure')
const Joi = require('joi')

const LicensureProfile = mongoose.model('LicensureProfile', licensureProfileSchema)

LicensureProfile.validate = (licensureProfile) => {
    const schema = Joi.object({
        year: Joi.number().required(),
        month: Joi.string().optional(),
        type: Joi.string().required(),
        passingRate: Joi.number().required(),
        nationalPassingRate: Joi.number().optional()
    })

    return schema.validate(licensureProfile)
}

module.exports = LicensureProfile