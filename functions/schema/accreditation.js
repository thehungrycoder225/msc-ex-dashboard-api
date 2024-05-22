const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accreditationSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    accreditationCount: {
        type: Number,
        required: true
    }
});

module.exports = accreditationSchema;