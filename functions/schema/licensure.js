const mongoose = require('mongoose')
const Schema = mongoose.Schema

const licensureProfileSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        optional: true,
        default: ''
    },
    type: {
        type: String,
        required: true
    },
    passingRate: {
        type: Number,
        required: true
    },
    nationalPassingRate: {
        type: Number,
        optional: true,
        default: 0
    },
})

module.exports = licensureProfileSchema;