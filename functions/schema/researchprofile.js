const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rndProjectSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    fundingType: {
        type: String,
        required: true
    },
});

const rndPublicationProfileSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
});

const rndPresentationProfileSchema = new Schema({
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
    },
});

const rndCopyrightProfileSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    registrationNo: {
        type: String,
        required: true
    },
});



module.exports = {
    rndProjectSchema,
    rndPublicationProfileSchema,
    rndPresentationProfileSchema,
    rndCopyrightProfileSchema,
}