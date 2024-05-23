const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scholarshipProfileSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    scholarshipName: {
        type: String,
        required: true
    },
    scholarshipCount: {
        type: Number,
        required: true
    }
})

module.exports = scholarshipProfileSchema;
