const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const copcSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

module.exports = copcSchema;